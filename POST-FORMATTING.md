# Writing posts: Markdown formatting rules

Quick reference for how Markdown behaves in this blog, so line breaks and lists
come out looking the way you intended. Kept out of `_posts/` on purpose so Jekyll
doesn't publish it.

## The one rule that catches everyone

**A single newline does NOT create a line break.** Markdown treats any run of
lines with no blank line between them as *one paragraph*, and joins them with a
single space when rendering.

So this:

```
1 https://github.com/GokulRajan23/Int-review
2 https://github.com/suleman1412/lesson-forge
3 https://github.com/josteng/Heft
```

renders as one long line:

> 1 https://github.com/GokulRajan23/Int-review 2 https://github.com/suleman1412/lesson-forge 3 https://github.com/josteng/Heft

And because paragraphs on this site are `text-align: justify` (see
`_sass/basic.sass`), that single line gets its spaces stretched edge-to-edge,
which is where the big ugly gaps come from.

## How to actually break lines

| You want | Write this |
| --- | --- |
| A new paragraph | Leave a **blank line** between the blocks |
| A hard line break *inside* one paragraph | End the line with **two spaces**, or a backslash `\` |
| A list | Start each line with `1.` (numbered) or `-` (bullets), and put a blank line before the first item |

### Numbered list — the right way

```
Here are the GitHub links of the projects I really liked:

1. https://github.com/GokulRajan23/Int-review
2. https://github.com/suleman1412/lesson-forge
3. https://github.com/josteng/Heft
4. https://github.com/suleman1412/buildathon-claude
```

Note: `1.` with a dot, not `1` on its own. The blank line before item 1 is
required — without it the list won't form.

### A URL followed by explanatory text

Put a blank line between them so they're separate paragraphs:

```
I used this grill-me skill and found it really useful:
https://github.com/mattpocock/skills

Here's a summary of the skill: ...
```

Without the blank line, the URL and the summary collapse onto the same line.

## Links

- Bare URL on its own: fine, it auto-links. `https://github.com/foo/bar`
- Nicer: `[grill-me skill](https://github.com/mattpocock/skills)` renders as a
  clickable **grill-me skill**.

## Images

Keep doing what the existing posts do:

```
<img src="{{ "/assets/images/hack2.jpeg" | relative_url }}" alt="Hackathon" style="width: 50%;">
```

Put a blank line **after** the image tag before the next paragraph, otherwise the
following text gets pulled up against the image as the same block.

## Other things worth knowing

- `#`, `##`, `###` at the start of a line are headings. If a line genuinely
  starts with `#` as text (rare), escape it: `\#`.
- `*word*` = italic, `**word**` = bold, `` `word` `` = monospace.
- `>` at the start of a line = block quote.
- A line of `---` with blank lines around it = horizontal rule. (Careful: `---`
  directly under a heading with no blank line can be read as front matter / a
  setext heading.)

## Before committing a post

1. Run `bundle exec jekyll serve` and open the post at `localhost:4000`.
2. Check the homepage excerpt too (`localhost:4000`).
3. Look specifically for: run-together paragraphs, lists that didn't form,
   stretched-out spacing, text jammed against images.

## Optional site-level fix

The stretched-space effect is amplified by `p { text-align: justify }` in
`_sass/basic.sass`. Switching that to `text-align: left` (or `start`) would make
imperfect line breaks far less glaring and generally reads better on narrow
columns. Left as a decision for later — not changed yet.
