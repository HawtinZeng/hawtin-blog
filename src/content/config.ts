import { defineCollection, z} from 'astro:content'
import { glob } from 'astro/loaders'
import { markdownTestLoader } from './loader'
export type BlogData = {
    _id: string,
    title: string,
    content: string,
}
const blog = defineCollection({
    loader: markdownTestLoader({url: "http://localhost:3006/read"}),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).optional(),
    }),
})

export const collections = { blog }

