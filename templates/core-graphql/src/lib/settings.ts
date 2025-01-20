import { client } from "@lib/client.ts";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/consts";

export type SanctuarySettings = {
  type: string;
  id: number;
  sanctuarySiteTitle: string;
  sanctuarySiteDescription: string;
  sanctuaryCopyright: string;
};

interface SanctuarySettingsResult {
  data: {
    sanctuarySettings: {
      edges: {
        node: {
          id: number;
          sanctuarySiteTitle: string;
          sanctuarySiteDescription: string;
          sanctuaryCopyright: string;
        };
      }[];
    };
  };
}

export const getSettings = async (): Promise<SanctuarySettings> => {
  const query: SanctuarySettingsResult = await client.query(
    `query SanctuarySettings {
      sanctuarySettings(first: 1) {
        edges {
          node {
            id
            sanctuaryCopyright
            sanctuarySiteDescription
            sanctuarySiteTitle
          }
        }
      }
    }`,
  );
  const resource = query.data.sanctuarySettings.edges[0].node;
  return {
    type: "config_pages--sanctuary_settings",
    sanctuarySiteTitle: resource.sanctuarySiteTitle
      ? resource.sanctuarySiteTitle
      : SITE_TITLE,
    sanctuarySiteDescription: resource.sanctuarySiteDescription
      ? resource.sanctuarySiteDescription
      : SITE_DESCRIPTION,
    sanctuaryCopyright: resource.sanctuaryCopyright,
    id: resource.id,
  };
};
