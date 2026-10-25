# Writing posts: formatting cheat sheet

Quick reference for how Markdown behaves in this blog. Posts live in `src/content/posts`.

## Line breaks and paragraphs

The site uses remark-breaks, so a single Enter makes a line break, the same as in Obsidian's preview. Type it the way you want it to look.

- One Enter = line break (same paragraph block)
- Blank line = new paragraph (a bit more vertical space)

## Lists

Numbered list:

```
1. First item
2. Second item
3. Third item
```

Bullet list:

```
- First item
- Second item
- Third item
```

Leave a blank line before the first item, or the list won't form. Use `1.` with a dot, not a bare `1`.

## Images

Paste the image into Obsidian. It lands in `src/content/posts/images` and Obsidian writes the embed for you:

```
![](images/Pasted%20image%2020260101120000.png)
```

That works as is and is optimized at build time. Nothing to fix by hand.

Old posts keep their `/assets/images/...` paths, which point to files in `public/assets/images/`. Leave those alone.

## Other basics

- `#`, `##`, `###` at the start of a line are headings.
- `*word*` is italic, `**word**` is bold, `` `word` `` is monospace.
- `>` at the start of a line is a block quote.
- `[nice text](https://example.com)` is a link.

## Before publishing

1. Run `npm run dev` and open the post at `localhost:4321/blog/`.
2. Check it reads the way you typed it, including the homepage excerpt.
