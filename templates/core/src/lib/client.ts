import { JsonApiClient, createCache } from "@drupal-api-client/json-api-client";
import { DecoupledRouterClient } from "@drupal-api-client/decoupled-router-client";
import { Jsona } from "jsona";

export const client = new JsonApiClient(
  import.meta.env.PUBLIC_DRUPAL_BASE_URL,
  {
    serializer: new Jsona(),
    cache: import.meta.env.MODE === "development" ? undefined : createCache(),
    debug: import.meta.env.MODE === "development",
  },
);

export const router = new DecoupledRouterClient(
  import.meta.env.PUBLIC_DRUPAL_BASE_URL,
  { cache: createCache(), debug: import.meta.env.MODE === "development" },
);
