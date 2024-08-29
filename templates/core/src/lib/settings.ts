import { z } from "astro:content";

import { client } from "@lib/client.ts";
import { configPagesSanctuarySettingsSchema } from "@lib/schemas/configPagesSanctuarySettingsSchema";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/consts";

const sanctuarySettingsSchema = configPagesSanctuarySettingsSchema.element.pick(
  {
    type: true,
    field_sanctuary_site_title: true,
    field_sanctuary_site_description: true,
    field_sanctuary_copyright: true,
    drupal_internal__id: true,
  },
);

export type SanctuarySettings = z.infer<typeof sanctuarySettingsSchema>;

export const getSettings = async (): Promise<SanctuarySettings> => {
  const response = configPagesSanctuarySettingsSchema.parse(
    await client.getCollection("config_pages--sanctuary_settings"),
  );
  const resource = response[0];
  return {
    type: resource.type,
    field_sanctuary_site_title: resource.field_sanctuary_site_title
      ? resource.field_sanctuary_site_title
      : SITE_TITLE,
    field_sanctuary_site_description: resource.field_sanctuary_site_description
      ? resource.field_sanctuary_site_description
      : SITE_DESCRIPTION,
    field_sanctuary_copyright: resource.field_sanctuary_copyright,
    drupal_internal__id: resource.drupal_internal__id,
  };
};
