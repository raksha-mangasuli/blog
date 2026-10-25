// One-off: turn Jekyll {{ "/assets/images/NAME" | relative_url }} tags in the
// copied posts into plain /assets/images/NAME (the base path is added at build
// time by src/plugins/rehype-base-assets.mjs). Only touches src/content/posts/*.md.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

const dir = new URL('../src/content/posts/', import.meta.url);
const tag = /\{\{\s*"(\/assets\/images\/[^"]+)"\s*\|\s*relative_url\s*\}\}/g;

let total = 0;
for (const name of readdirSync(dir)) {
	if (!name.endsWith('.md')) continue;
	const file = new URL(name, dir);
	const before = readFileSync(file, 'utf8');
	let n = 0;
	const after = before.replace(tag, (_, path) => (n++, path));
	if (n) {
		writeFileSync(file, after);
		console.log(`${name}: ${n}`);
		total += n;
	}
}
console.log(`total replaced: ${total}`);
