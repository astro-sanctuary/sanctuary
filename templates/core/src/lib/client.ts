import { JsonApiClient } from "@drupal-api-client/json-api-client";

export const client = new JsonApiClient(import.meta.env.DRUPAL_BASE_URL);
