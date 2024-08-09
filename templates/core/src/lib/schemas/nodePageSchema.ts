import { z } from "astro:content";

export const nodePageSchema = z.array(
  z.object({
    type: z.string(),
    id: z.string(),
    drupal_internal__nid: z.number(),
    drupal_internal__vid: z.number(),
    langcode: z.string(),
    revision_timestamp: z.string(),
    status: z.boolean(),
    title: z.string(),
    created: z.string(),
    changed: z.string(),
    promote: z.boolean(),
    sticky: z.boolean(),
    default_langcode: z.boolean(),
    path: z.object({
      alias: z.string(),
      pid: z.number(),
      langcode: z.string(),
    }),
    body: z.object({
      value: z.string(),
      format: z.string(),
      processed: z.string(),
      summary: z.string(),
    }),
    links: z.object({ self: z.object({ href: z.string() }) }),
    node_type: z.object({
      type: z.string(),
      id: z.string(),
      resourceIdObjMeta: z.object({ drupal_internal__target_id: z.string() }),
    }),
    revision_uid: z.object({
      type: z.string(),
      id: z.string(),
      resourceIdObjMeta: z.object({ drupal_internal__target_id: z.number() }),
    }),
    uid: z.object({
      type: z.string(),
      id: z.string(),
      resourceIdObjMeta: z.object({ drupal_internal__target_id: z.number() }),
    }),
    relationshipNames: z.array(z.string()),
  }),
);
