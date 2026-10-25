# blog

Raksha's personal blog, an Astro site hosted on GitHub Pages at [raksha-mangasuli.github.io/blog](https://raksha-mangasuli.github.io/blog/), interconnected with the [portfolio site](https://raksha-mangasuli.github.io/raksha-portfolio/). Posts cover Tech, Hobbies, and General topics.

The design started from the [type-on-strap](https://github.com/niklasbuschmann/contrast) Jekyll theme and has since been ported to Astro.

## Tech stack

- [Astro](https://astro.build/) with TypeScript
- Plain CSS with design tokens in `src/styles/tokens.css`
- RSS feed and sitemap via Astro integrations
- Deployed to GitHub Pages with GitHub Actions (`.github/workflows/deploy.yml`)

## Local development

Install Node (the version is in `.nvmrc`), then:

```
npm install
npm run dev
```

The site runs at `http://localhost:4321/blog/`.

To build for production into `dist/`:

```
npm run build
```

To type check:

```
npx astro check
```

### Writing posts

Posts are Markdown files in `src/content/posts`, with `title`, `date` and `categories` front matter. See [POST-FORMATTING.md](POST-FORMATTING.md) for the formatting cheat sheet (line breaks, lists, links, etc.).

### Writing in Obsidian

- The Obsidian vault is `src/content/posts`.
- Obsidian settings: attachments folder `images`, wikilinks off (Markdown links), new link format "relative path to file".
- A new post is a single `.md` file in the vault root. Use the template in `_templates/` for the front matter (`title`, `date`, `categories`).
- Pasted images are saved to `src/content/posts/images`. The embed Obsidian writes, `![](images/Pasted%20image%20....png)`, works as is and is optimized at build time.
- Old posts that use `/assets/images/...` (files in `public/assets/images/`) keep working unchanged.
- The old Jekyll image-fixing scripts and pre-commit hook are kept in `legacy-jekyll/` for reference only.

## License

[Public domain](UNLICENSE.txt), inherited from the original [type-on-strap](https://github.com/niklasbuschmann/contrast) theme.
