#!/bin/sh
# Moves Obsidian-pasted images out of _posts/assets/ into assets/images/
# (lowercase-hyphenated names) and rewrites the embeds in _posts/*.md to
#     ![alt]({{ "/assets/images/NAME" | relative_url }})
# Also wraps bare URLs in <...> so they render as links.
# Run by .githooks/pre-commit, or by hand:  sh scripts/fix-post-images.sh

cd "$(git rev-parse --show-toplevel)" || exit 1

changed=0
for post in _posts/*.md; do
  [ -f "$post" ] || continue
  # embeds shaped like ![alt](assets/images/NAME.ext), NAME possibly %20-encoded
  grep -o '!\[[^]]*\](assets/images/[^)]*)' "$post" | while IFS= read -r embed; do
    alt=$(printf '%s' "$embed" | sed 's/^!\[\([^]]*\)\].*/\1/')
    enc=$(printf '%s' "$embed" | sed 's/.*(assets\/images\/\(.*\))$/\1/')
    orig=$(printf '%s' "$enc" | sed 's/%20/ /g')
    new=$(printf '%s' "$orig" | tr 'A-Z' 'a-z' | sed 's/[ _]\{1,\}/-/g')
    src="_posts/assets/images/$orig"
    if [ -f "$src" ]; then
      mv "$src" "assets/images/$new"
      echo "fix-post-images: moved $orig -> assets/images/$new"
    elif [ ! -f "assets/images/$new" ]; then
      echo "fix-post-images: WARNING $post references missing image: $orig" >&2
      continue
    fi
    repl="![$alt]({{ \"/assets/images/$new\" | relative_url }})"
    awk -v old="$embed" -v new="$repl" '{ while ((i = index($0, old)) > 0) $0 = substr($0, 1, i - 1) new substr($0, i + length(old)); print }' "$post" > "$post.tmp" && mv "$post.tmp" "$post"
    echo "fix-post-images: rewrote embed in $post"
  done
done

# make bare URLs clickable (kramdown doesn't autolink them)
perl scripts/autolink-post-urls.pl _posts/*.md

# remove leftover empty folders and stage anything we touched
find _posts/assets -type d -empty -delete 2>/dev/null

# an asset that was staged under _posts/ and then moved above leaves a stale
# index entry (shows as "AD"), which makes the pre-commit guard fail; drop it
git diff --cached --name-only --diff-filter=A -- _posts | while IFS= read -r f; do
  [ -e "$f" ] || git rm --cached -q --ignore-unmatch -- "$f"
done

git add -A assets/images _posts/*.md 2>/dev/null
exit 0
