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

- Bare URL on its own line: fine, it auto-links.
- Nicer: `[grill-me skill](https://github.com/mattpocock/skills)` renders as a
  clickable **grill-me skill**.

## Images

Keep doing what the existing posts do:

```
<img src="{{ "/assets/images/hack2.jpeg" | relative_url }}" alt="Hackathon" style="width: 50%;">
```

A blank line after the image tag gives the following text a bit of breathing room.

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
