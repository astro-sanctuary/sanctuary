import { z } from 'astro:content';

export const menuItemsMainSchema = z.array(
  z.union([
    z.object({
      type: z.string(),
      id: z.string(),
      description: z.string(),
      enabled: z.boolean(),
      expanded: z.boolean(),
      menu_name: z.string(),
      meta: z.array(z.unknown()),
      options: z.array(z.unknown()),
      parent: z.string(),
      provider: z.string(),
      route: z.object({ name: z.string(), parameters: z.array(z.unknown()) }),
      title: z.string(),
      url: z.string(),
      weight: z.number(),
    }),
    z.object({
      type: z.string(),
      id: z.string(),
      description: z.null(),
      enabled: z.boolean(),
      expanded: z.boolean(),
      menu_name: z.string(),
      meta: z.object({ entity_id: z.string() }),
      options: z.array(z.unknown()),
      parent: z.string(),
      provider: z.string(),
      route: z.object({
        name: z.string(),
        parameters: z.object({ node: z.string() }),
      }),
      title: z.string(),
      url: z.string(),
      weight: z.number(),
    }),
  ])
);
