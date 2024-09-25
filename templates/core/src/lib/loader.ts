import type { Loader } from "astro/loaders";
import { client } from "@/lib/client";

// Define any options that the loader needs
export function drupalLoader({
  type,
  queryString,
}: {
  type: string;
  queryString?: string;
}): Loader {
  // Configure the loader
  const [, bundle] = type.split("--");
  // Return a loader object
  return {
    name: "drupal-loader",
    // Called when updating the collection.
    load: async ({ store, parseData }) => {
      const resources: any = await client.getCollection(type, { queryString });
      store.clear();

      for (const resource of resources) {
        const id = resource.id;
        const data = await parseData({
          id,
          data: resource,
        });
        store.set({
          id,
          data,
        });
      }
    },
  };
}
