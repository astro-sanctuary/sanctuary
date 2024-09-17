import { z } from "astro:content";

export const nodeArticleWithImageSchema = z.array(
  z.object({
    type: z.string(),
    id: z.string(),
    drupal_internal__nid: z.number(),
    drupal_internal__vid: z.number().nullable(),
    langcode: z.string(),
    revision_timestamp: z.string(),
    status: z.boolean(),
    title: z.string(),
    created: z.string(),
    changed: z.string(),
    promote: z.boolean(),
    sticky: z.boolean(),
    default_langcode: z.boolean(),
    revision_translation_affected: z.boolean(),
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
    // TODO: Add comments back to schema
    // comment: z.object({
    //   status: z.number(),
    //   cid: z.null(),
    //   last_comment_timestamp: z.null(),
    //   last_comment_name: z.null(),
    //   last_comment_uid: z.null(),
    //   comment_count: z.null(),
    // }),
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
    field_image: z.object({
      type: z.string(),
      id: z.string(),
      drupal_internal__fid: z.number(),
      langcode: z.string(),
      filename: z.string(),
      uri: z.object({ value: z.string(), url: z.string() }),
      filemime: z.string(),
      filesize: z.number(),
      status: z.boolean(),
      created: z.string(),
      changed: z.string(),
      links: z.object({ self: z.object({ href: z.string() }) }),
      resourceIdObjMeta: z.object({
        alt: z.string(),
        title: z.string(),
        width: z.number().nullable(),
        height: z.number().nullable(),
        drupal_internal__target_id: z.number(),
      }),
      uid: z.object({
        type: z.string(),
        id: z.string(),
        resourceIdObjMeta: z.object({ drupal_internal__target_id: z.number() }),
      }),
      relationshipNames: z.array(z.string()),
    }),
    field_tags: z.array(z.unknown()),
    relationshipNames: z.array(z.string()),
  }),
);
