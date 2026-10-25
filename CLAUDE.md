# Blog: CLAUDE.md

## What this project is

Raksha's personal blog, "Timestamped Thoughts", at raksha-mangasuli.github.io/blog/. It is interconnected with the portfolio site (raksha-mangasuli.github.io/raksha-portfolio/). Categories: General, Tech, Hobbies (matches the site's nav).

## Stack

- Astro with TypeScript
- Plain CSS with design tokens in `src/styles/tokens.css` (no CSS framework)
- Hosted on GitHub Pages, deployed via GitHub Actions (`.github/workflows/deploy.yml`)
- Deploy branch: `master`. Node version comes from `.nvmrc`.

## Commands

- `npm run dev`: local dev server
- `npm run build`: production build into `dist/`
- `npx astro check`: type check

## Content rules

- Never write or edit post copy. Raksha writes the posts herself. Claude's role is the tooling and site code around the blog.
- Never invent post content, dates or details.
- Never use em dashes in any text written for Raksha.

## Working rules

- Commit messages must be specific (e.g. "Fix feed item order for same-day posts", not "update feed").
- Debugging limit: if a fix fails twice, stop and report what was tried and what happened instead of retrying.
- Check the actual built output (`dist/`) or the rendered page before calling something done.

## Writing posts

- Posts are written in Obsidian. The vault is `src/content/posts`.
- Obsidian settings: attachments folder `images`, wikilinks off (use Markdown links), new link format "relative path to file".
- A new post is a single `.md` file in the vault root, with `title`, `date` and `categories` front matter (see `_templates/_template.md`).
- Pasted images land in `src/content/posts/images`. Obsidian's embed `![](images/Pasted%20image%20....png)` works as is and is optimized at build time, so no path fixing.
- Old posts keep their `/assets/images/...` paths in `public/`. Do not touch them.
- The Jekyll-era scripts and pre-commit hook live in `legacy-jekyll/` and are unused.
