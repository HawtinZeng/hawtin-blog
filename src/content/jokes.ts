// src/loaders/jokes.ts
import type { Loader } from "astro/loaders";

export const jokesLoader: Loader = {
  name: "jokes",
  load: async (context) => {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });

    const json = await response.json();

    context.logger.info(JSON.stringify(json));
    context.store.set({
      id: json.id,
      data: json,
    });
  },
};
