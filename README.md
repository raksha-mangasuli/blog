# blog

Raksha's personal blog — a Jekyll site hosted on GitHub Pages at [raksha-mangasuli.github.io/blog](https://raksha-mangasuli.github.io/blog/), interconnected with the [portfolio site](https://raksha-mangasuli.github.io/raksha-portfolio/). Posts cover Tech, Hobbies, and General topics.

Built on the [type-on-strap](https://github.com/niklasbuschmann/contrast) Jekyll theme.

## Tech stack

- Jekyll (Ruby)
- [jekyll-admin](https://github.com/jekyll/jekyll-admin) — local admin UI for writing/editing posts
- jekyll-feed, jekyll-paginate
- Deployed via GitHub Pages

## Local development

Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/) and Bundler, then:

```
bundle install
bundle exec jekyll serve
```

The site runs at `http://localhost:4000/blog/`.

### Writing posts

Posts are drafted locally through the jekyll-admin UI at `http://localhost:4000/admin`, then committed and pushed as usual. A few things to know before using it:

- The "New metadata field" UI in jekyll-admin is buggy — it can write a literal `Key:`/`Value:` pair instead of proper YAML. Always double-check a new post's raw front matter before committing.
- Creating a post can throw a 500 error after clicking Create — this is a known jekyll-admin bug, not a real failure. Check `_posts/` and refresh the admin post list rather than assuming the post wasn't saved.
- `_config.yml` applies `layout: post` and `categories: General` to everything in `_posts` by default. Only set `categories` manually if a post isn't General.

See [POST-FORMATTING.md](POST-FORMATTING.md) for the full formatting cheat sheet (line breaks, lists, links, etc.).

### Writing in Obsidian

Posts are drafted in Obsidian, with the vault root pointed at `_posts/`. `_config.yml` sets `kramdown: hard_wrap: true` specifically so single newlines render as line breaks, matching how Obsidian writes paragraphs — if posts start rendering with run-together lines, check that setting is still there and restart the Jekyll server.

Images pasted in Obsidian need a manual fix before they'll publish, since Obsidian and Jekyll disagree on paths:

1. Obsidian saves the image to `_posts/assets/images/` — Jekyll skips `_`-prefixed folders, so it never gets published.
2. Obsidian writes the embed as `![](assets/images/NAME.ext)`, a vault-relative path that won't resolve on the built site.

Fix for each new image: move it to `assets/images/NAME.ext` at the repo root, then rewrite the embed to `{{ "/assets/images/NAME" | relative_url }}` per the Assets section below.

### Assets (images, PDFs)

All images and PDFs go in `assets/images/`, referenced as `{{ "/assets/images/NAME" | relative_url }}`. Nothing goes under `_posts/` — Jekyll skips `_`-prefixed folders, so it 404s live even though it works locally.

Run `git config core.hooksPath .githooks` once per clone — a pre-commit hook blocks asset files accidentally staged under `_posts/`.

## Restarting after config changes

Jekyll only reads `_config.yml` at startup, so restart `jekyll serve` after any config change — it won't auto-regenerate on its own.

## License

[Public domain](UNLICENSE.txt), inherited from the original [type-on-strap](https://github.com/niklasbuschmann/contrast) theme.
