
import { createMarkdownProcessor, parseFrontmatter } from "@astrojs/markdown-remark";
import type { Loader, LoaderContext } from "astro/loaders";
import type { BlogData } from "./config";
export const markdownTestLoader: Loader = {
	name: "markdown-test-loader",
	load: async ({ config, store, parseData, generateDigest, logger }: LoaderContext) => {
		const url = 'http://hawtin.me:8085/blogs'

		const res = await fetch(url, {
			headers: {
				Accept: "application/json",
			},
		})
		if (!res) return

		const blogDatas = await res.json() as BlogData[];
    logger.info(JSON.stringify(blogDatas));

		if (!Array.isArray(blogDatas))  return

		blogDatas.forEach(async (blog) => {
			const processor = await createMarkdownProcessor(config.markdown);
			const parsedFrontmatter = parseFrontmatter(blog.content);
			const frontmatter = parsedFrontmatter.frontmatter;
			const rendered = await processor.render(parsedFrontmatter.content ?? "");
			const id = blog._id
			const data = await parseData({ id, data: frontmatter });

			store.set({
				id,
				data,
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