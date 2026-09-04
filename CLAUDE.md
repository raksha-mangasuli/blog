# Blog: CLAUDE.md

## What this project is

This is Raksha's personal blog, a Jekyll site hosted on GitHub Pages at raksha-mangasuli.github.io/blog/, interconnected with the portfolio site (raksha-mangasuli.github.io/raksha-portfolio/). Uses the type-on-strap Jekyll theme. Posts are written locally via the jekyll-admin plugin's admin UI at localhost:4000/admin, then committed and pushed as usual.

## Tech stack

- Jekyll (Ruby), theme: type-on-strap
- jekyll-admin gem for local post writing UI
- Deployed via GitHub Pages, source branch is main
- Categories: General, Tech, Hobbies (matches the site's nav)

## Known jekyll-admin quirks

- **The "New metadata field" UI in jekyll-admin is buggy.** It has previously written the literal key/value pair as `Key: fieldname` / `Value: value` instead of substituting it into proper YAML (e.g. `categories: General`). Don't rely on it for adding categories or other custom front matter. Always double check the raw front matter of a post created through jekyll-admin before committing.
- **Creating a post through jekyll-admin can throw a 500 error / NoMethodError on `to_api`** after clicking Create. This is a known upstream bug in jekyll-admin (race condition between file write and site regeneration), not a real failure. The post file is usually still written correctly to disk, check `_posts` and refresh the admin post list rather than assuming the post wasn't saved.
- `_config.yml` has a `defaults` block that automatically applies `layout: post` and `categories: General` to everything in `_posts`, so these don't need to be typed manually. Only override `categories` in a post's front matter if it's not General.

## Excerpts on the homepage

- `excerpt_separator: "<!--more-->"` is set in `_config.yml`, and `show_excerpts: true` is set for the type-on-strap theme.
- As of this writing, excerpt truncation is inconsistent, post 7 truncates correctly, posts 5 and 8 do not, despite similar setup. Root cause not yet confirmed, still under investigation. Don't assume a fix is complete just because the separator and config look correct, verify against the actual rendered homepage output.

## Content rules

- Do not use an LLM to write or modify actual blog post content/copy, Raksha writes these herself. Claude Code's role here is the tooling and site configuration around the blog, not the posts themselves.
- Never invent post content, dates, or details.

## Post formatting

- Markdown line-break behavior trips Raksha up (single newlines collapse into one paragraph, lists need `1.` + a blank line before them, `text-align: justify` in `_sass/basic.sass` exaggerates the result). Full cheat sheet is in `POST-FORMATTING.md` at the repo root. Point her there when a post renders with run-together lines or stretched spacing.

## Workflow notes

- Test changes locally (bundle exec jekyll serve) and check the actual rendered output before considering a fix complete, don't assume a config change worked without visually confirming it.
- Restart the local Jekyll server after any _config.yml change, Jekyll only reads config on startup, not via auto-regeneration.
- Commit messages should be specific (e.g. "Fix duplicate defaults block in _config.yml", not "update config").