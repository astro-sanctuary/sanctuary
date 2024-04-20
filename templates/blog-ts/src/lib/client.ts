import { JsonApiClient } from "@drupal-api-client/json-api-client";
import { Jsona } from "jsona";

export const client = new JsonApiClient(import.meta.env.DRUPAL_BASE_URL, {
  serializer: new Jsona(),
});
