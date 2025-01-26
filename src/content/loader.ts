
import { createMarkdownProcessor, parseFrontmatter } from "@astrojs/markdown-remark";
import type { Loader, LoaderContext } from "astro/loaders";
import type { BlogData } from "./config";
import { getEntry } from "astro:content";
export function markdownTestLoader({url}: {url: string}): Loader {
	return {
		name: "markdown-test-loader",
		load: async ({ config, store, parseData, generateDigest, logger }: LoaderContext) => {
			store.clear();
			const res = await fetch(url);
			const blogDatas = await res.json() as BlogData[];
			if (!Array.isArray(blogDatas))  return

      blogDatas.forEach(async (blog) => {
			const processor = await createMarkdownProcessor(config.markdown);
			const parsedFrontmatter = parseFrontmatter(blog.content);
			const frontmatter = parsedFrontmatter.frontmatter;
			const rendered = await processor.render(parsedFrontmatter.content ?? "");
			const id = blog._id
			const data = await parseData({ id, data: frontmatter });
			const digest = generateDigest(data);

			store.set({
				id,
				data,
				digest,
				rendered: {
					html: rendered.code,
					metadata: {
						headings: rendered.metadata.headings,
						frontmatter: frontmatter
					}
				},
			});
      })
		},
	};
}