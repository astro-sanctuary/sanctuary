import { z } from 'astro:content';

export const articlesSchema = z.object({
  jsonapi: z.object({
    version: z.string(),
    meta: z.object({
      links: z.object({ self: z.object({ href: z.string() }) }),
    }),
  }),
  data: z.array(
    z.union([
      z.object({
        type: z.string(),
        id: z.string(),
        links: z.object({ self: z.object({ href: z.string() }) }),
        attributes: z.object({
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
          comment: z.object({
            status: z.number(),
            cid: z.number(),
            last_comment_timestamp: z.number(),
            last_comment_name: z.null(),
            last_comment_uid: z.number(),
            comment_count: z.number(),
          }),
        }),
        relationships: z.object({
          node_type: z.object({
            data: z.object({
              type: z.string(),
              id: z.string(),
              meta: z.object({ drupal_internal__target_id: z.string() }),
            }),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
          revision_uid: z.object({
            data: z.object({
              type: z.string(),
              id: z.string(),
              meta: z.object({ drupal_internal__target_id: z.number() }),
            }),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
          uid: z.object({
            data: z.object({
              type: z.string(),
              id: z.string(),
              meta: z.object({ drupal_internal__target_id: z.number() }),
            }),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
          field_image: z.object({
            data: z.object({
              type: z.string(),
              id: z.string(),
              meta: z.object({
                alt: z.string(),
                title: z.string(),
                width: z.number(),
                height: z.number(),
                drupal_internal__target_id: z.number(),
              }),
            }),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
          field_tags: z.object({
            data: z.array(
              z.object({
                type: z.string(),
                id: z.string(),
                meta: z.object({ drupal_internal__target_id: z.number() }),
              })
            ),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
        }),
      }),
      z.object({
        type: z.string(),
        id: z.string(),
        links: z.object({ self: z.object({ href: z.string() }) }),
        attributes: z.object({
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
          comment: z.object({
            status: z.number(),
            cid: z.number(),
            last_comment_timestamp: z.number(),
            last_comment_name: z.null(),
            last_comment_uid: z.number(),
            comment_count: z.number(),
          }),
        }),
        relationships: z.object({
          node_type: z.object({
            data: z.object({
              type: z.string(),
              id: z.string(),
              meta: z.object({ drupal_internal__target_id: z.string() }),
            }),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
          revision_uid: z.object({
            data: z.object({
              type: z.string(),
              id: z.string(),
              meta: z.object({ drupal_internal__target_id: z.number() }),
            }),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
          uid: z.object({
            data: z.object({
              type: z.string(),
              id: z.string(),
              meta: z.object({ drupal_internal__target_id: z.number() }),
            }),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
          field_image: z.object({
            data: z.object({
              type: z.string(),
              id: z.string(),
              meta: z.object({
                alt: z.string(),
                title: z.string(),
                width: z.number(),
                height: z.number(),
                drupal_internal__target_id: z.number(),
              }),
            }),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
          field_tags: z.object({
            data: z.array(
              z.object({
                type: z.string(),
                id: z.string(),
                meta: z.object({
                  arity: z.number(),
                  drupal_internal__target_id: z.number(),
                }),
              })
            ),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
        }),
      }),
      z.object({
        type: z.string(),
        id: z.string(),
        links: z.object({ self: z.object({ href: z.string() }) }),
        attributes: z.object({
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
          comment: z.object({
            status: z.number(),
            cid: z.number(),
            last_comment_timestamp: z.number(),
            last_comment_name: z.null(),
            last_comment_uid: z.number(),
            comment_count: z.number(),
          }),
        }),
        relationships: z.object({
          node_type: z.object({
            data: z.object({
              type: z.string(),
              id: z.string(),
              meta: z.object({ drupal_internal__target_id: z.string() }),
            }),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
          revision_uid: z.object({
            data: z.object({
              type: z.string(),
              id: z.string(),
              meta: z.object({ drupal_internal__target_id: z.number() }),
            }),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
          uid: z.object({
            data: z.object({
              type: z.string(),
              id: z.string(),
              meta: z.object({ drupal_internal__target_id: z.number() }),
            }),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
          field_image: z.object({
            data: z.object({
              type: z.string(),
              id: z.string(),
              meta: z.object({
                alt: z.string(),
                title: z.string(),
                width: z.number(),
                height: z.number(),
                drupal_internal__target_id: z.number(),
              }),
            }),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
          field_tags: z.object({
            data: z.array(
              z.union([
                z.object({
                  type: z.string(),
                  id: z.string(),
                  meta: z.object({ drupal_internal__target_id: z.number() }),
                }),
                z.object({
                  type: z.string(),
                  id: z.string(),
                  meta: z.object({
                    arity: z.number(),
                    drupal_internal__target_id: z.number(),
                  }),
                }),
              ])
            ),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
        }),
      }),
      z.object({
        type: z.string(),
        id: z.string(),
        links: z.object({ self: z.object({ href: z.string() }) }),
        attributes: z.object({
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
          comment: z.object({
            status: z.number(),
            cid: z.number(),
            last_comment_timestamp: z.number(),
            last_comment_name: z.null(),
            last_comment_uid: z.number(),
            comment_count: z.number(),
          }),
        }),
        relationships: z.object({
          node_type: z.object({
            data: z.object({
              type: z.string(),
              id: z.string(),
              meta: z.object({ drupal_internal__target_id: z.string() }),
            }),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
          revision_uid: z.object({
            data: z.object({
              type: z.string(),
              id: z.string(),
              meta: z.object({ drupal_internal__target_id: z.number() }),
            }),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
          uid: z.object({
            data: z.object({
              type: z.string(),
              id: z.string(),
              meta: z.object({ drupal_internal__target_id: z.number() }),
            }),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
          field_image: z.object({
            data: z.object({
              type: z.string(),
              id: z.string(),
              meta: z.object({
                alt: z.string(),
                title: z.string(),
                width: z.number(),
                height: z.number(),
                drupal_internal__target_id: z.number(),
              }),
            }),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
          field_tags: z.object({
            data: z.array(
              z.union([
                z.object({
                  type: z.string(),
                  id: z.string(),
                  meta: z.object({
                    arity: z.number(),
                    drupal_internal__target_id: z.number(),
                  }),
                }),
                z.object({
                  type: z.string(),
                  id: z.string(),
                  meta: z.object({ drupal_internal__target_id: z.number() }),
                }),
              ])
            ),
            links: z.object({
              related: z.object({ href: z.string() }),
              self: z.object({ href: z.string() }),
            }),
          }),
        }),
      }),
    ])
  ),
  included: z.array(
    z.object({
      type: z.string(),
      id: z.string(),
      links: z.object({ self: z.object({ href: z.string() }) }),
      attributes: z.object({
        drupal_internal__fid: z.number(),
        langcode: z.string(),
        filename: z.string(),
        uri: z.object({ value: z.string(), url: z.string() }),
        filemime: z.string(),
        filesize: z.number(),
        status: z.boolean(),
        created: z.string(),
        changed: z.string(),
      }),
      relationships: z.object({
        uid: z.object({
          data: z.object({
            type: z.string(),
            id: z.string(),
            meta: z.object({ drupal_internal__target_id: z.number() }),
          }),
          links: z.object({
            related: z.object({ href: z.string() }),
            self: z.object({ href: z.string() }),
          }),
        }),
      }),
    })
  ),
  links: z.object({ self: z.object({ href: z.string() }) }),
});
