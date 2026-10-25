// Prepends the site base path to root-relative /assets/ URLs so posts can say
// /assets/images/foo.png and stay independent of where the site is hosted.
// Handles parsed <img src> / <a href> elements and raw HTML nodes, because
// Astro's rehype-raw step runs after user rehype plugins.
interface HastNode {
	type: string;
	tagName?: string;
	value?: string;
	properties?: Record<string, unknown>;
	children?: HastNode[];
}

interface Options {
	base?: string;
}

const RAW_TAG_URL = /(<(?:img|a)\b[^>]*?\b(?:src|href)\s*=\s*["'])\/assets\//gi;

export default function rehypeBaseAssets({ base = '' }: Options = {}) {
	const prefix = base.replace(/\/$/, '');
	const fix = (value: unknown) =>
		typeof value === 'string' && value.startsWith('/assets/') ? `${prefix}${value}` : value;

	function walk(node: HastNode) {
		if (node.type === 'element' && node.properties) {
			if (node.tagName === 'img') node.properties.src = fix(node.properties.src);
			if (node.tagName === 'a') node.properties.href = fix(node.properties.href);
		} else if (node.type === 'raw' && typeof node.value === 'string') {
			node.value = node.value.replace(RAW_TAG_URL, `$1${prefix}/assets/`);
		}
		node.children?.forEach(walk);
	}

	// Kramdown wraps a lone block-level raw <img> in <p>; the post CSS is built
	// around that (`.post > p`), so do the same for root-level raw <img> nodes.
	const wrapRootImages = (tree: HastNode) => {
		for (const node of tree.children ?? []) {
			if (node.type === 'raw' && typeof node.value === 'string' && /^\s*<img\b/i.test(node.value)) {
				node.value = `<p>${node.value.trim()}</p>`;
			}
		}
	};

	return (tree: HastNode) => {
		walk(tree);
		wrapRootImages(tree);
	};
}
