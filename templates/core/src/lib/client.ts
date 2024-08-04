import { JsonApiClient, createCache } from "@drupal-api-client/json-api-client";
import { Jsona } from "jsona";

export const client = new JsonApiClient(
  import.meta.env.PUBLIC_DRUPAL_BASE_URL,
  {
    serializer: new Jsona(),
    cache: createCache(),
    debug: import.meta.env.MODE === "development",
  },
);
