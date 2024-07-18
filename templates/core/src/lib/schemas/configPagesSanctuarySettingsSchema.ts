import { z } from 'astro:content';

export const configPagesSanctuarySettingsSchema = z.array(
  z.object({
    type: z.string(),
    id: z.string(),
    drupal_internal__id: z.number(),
    label: z.string(),
    context: z.string(),
    changed: z.string(),
    field_sanctuary_copyright: z.string(),
    field_sanctuary_site_description: z.string(),
    field_sanctuary_site_title: z.string(),
    links: z.object({ self: z.object({ href: z.string() }) }),
    config_pages_type: z.object({
      type: z.string(),
      id: z.string(),
      resourceIdObjMeta: z.object({ drupal_internal__target_id: z.string() }),
    }),
    relationshipNames: z.array(z.string()),
  })
);
