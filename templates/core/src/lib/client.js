// Workaround for issues running TS in the bin directory

import { JsonApiClient } from "@drupal-api-client/json-api-client";
import { Jsona } from "jsona";

export const client = new JsonApiClient(process.env.DRUPAL_BASE_URL, {
  serializer: new Jsona(),
});
