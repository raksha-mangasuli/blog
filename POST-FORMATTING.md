# Writing posts: Markdown formatting rules

Quick reference for how Markdown behaves in this blog. Kept out of `_posts/` on
purpose so Jekyll doesn't publish it.

## Line breaks now match Obsidian

`_config.yml` sets `kramdown: hard_wrap: true`, so **every single newline you type
becomes a line break**, the same as Obsidian's preview. Type it the way you want
it to look.

- One Enter  = line break (stays in the same paragraph block)
- Blank line = new paragraph (a bit more vertical space)

If a post ever renders with lines run together, the cause is almost always that
`hard_wrap: true` got removed from `_config.yml`, or the Jekyll server wasn't
restarted after a config change (Jekyll only reads config on startup).

## Lists

`hard_wrap` puts each item on its own line, but for a *properly formatted* list
(hanging indent, real numbering) still write:

```
Here are the GitHub links of the projects I really liked:

1. https://github.com/GokulRajan23/Int-review
2. https://github.com/suleman1412/lesson-forge
3. https://github.com/josteng/Heft
```

- `1.` with a dot, not a bare `1`.
- Blank line before the first item, or the list won't form.
- `-` instead of `1.` for bullets.

## Links

**A bare URL does NOT become a link here.** kramdown (this site's Markdown engine)
only linkifies URLs that are written one of these two ways:

| Write | Renders as |
| --- | --- |
| `<https://github.com/foo/bar>` | the URL, clickable |
| `[nice text](https://github.com/foo/bar)` | **nice text**, clickable |

Angle brackets are the quick option; `[text](url)` when you want readable link
text. Writing just `https://github.com/foo/bar` leaves it as plain grey text.

Styling and behaviour are automatic once a link is real: post-body links show up
blue and underlined, and any link pointing to another site opens in a new tab
(links to your own blog stay in the same tab). You don't add anything for that.

## Where images and PDFs live

**All assets go in the top-level `assets/images/` folder.** Never put them under
`_posts/` — Jekyll ignores any folder starting with `_`, so a file in
`_posts/assets/` works locally but 404s on the live blog. A git pre-commit hook
(`.githooks/pre-commit`) blocks the mistake; enable it once per clone with
`git config core.hooksPath .githooks`.

Use plain filenames: lowercase, hyphens, no spaces or accented characters
(`lightning-demos.pdf`, not `Lightning demos · Night.pdf`).

## Images

Keep doing what the existing posts do:

```
<img src="{{ "/assets/images/hack2.jpeg" | relative_url }}" alt="Hackathon" style="width: 50%;">
```

A blank line after the image tag gives the following text a bit of breathing room.

## PDFs (and other file downloads)

Link to them, don't try to embed with `![]()`:

```
[Lightning demos (PDF)]({{ "/assets/images/lightning-demos.pdf" | relative_url }})
```

PDF links open in a new tab automatically (same script that handles off-site
links), so the reader keeps their place in the post.

## Other things worth knowing

- `#`, `##`, `###` at the start of a line are headings.
- `*word*` = italic, `**word**` = bold, `` `word` `` = monospace.
- `>` at the start of a line = block quote.
- Paragraphs are `text-align: justify` (`_sass/basic.sass`). With normal prose
  this is fine; it only looks odd if a "paragraph" is actually a single line
  crammed with widely-spaced items (which hard_wrap now prevents anyway).

## Before committing a post

1. `bundle exec jekyll serve` — **restart it** if you touched `_config.yml`.
2. Open the post at `localhost:4000` and check it reads the way you typed it.
3. Check the homepage excerpt too.
