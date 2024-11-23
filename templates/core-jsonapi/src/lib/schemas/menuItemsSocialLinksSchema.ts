import { z } from 'astro:content';

export const menuItemsSocialLinksSchema = z.array(
  z.object({
    type: z.string(),
    id: z.string(),
    description: z.null(),
    enabled: z.boolean(),
    expanded: z.boolean(),
    menu_name: z.string(),
    meta: z.object({ entity_id: z.string() }),
    options: z.object({ external: z.boolean() }),
    parent: z.string(),
    provider: z.string(),
    route: z.object({ name: z.string(), parameters: z.array(z.unknown()) }),
    title: z.string(),
    url: z.string(),
    weight: z.number(),
    view_mode: z.string(),
    field_icon: z.object({
      icon: z.string(),
      settings: z.object({
        width: z.string(),
        height: z.string(),
        color: z.string(),
      }),
    }),
  })
);
