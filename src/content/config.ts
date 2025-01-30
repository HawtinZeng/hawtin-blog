import { defineCollection, z} from 'astro:content'
import { markdownTestLoader } from './loader'
export type BlogData = {
    _id: string,
    title: string,
    content: string,
}

import { jokesLoader } from "./jokes";
const jokes = defineCollection({
    loader: jokesLoader,
});

const blog = defineCollection({
    loader: markdownTestLoader,
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).optional(),
    }),
})

export const collections = { blog, jokes }
