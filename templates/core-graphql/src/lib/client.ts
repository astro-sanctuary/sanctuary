import { JsonApiClient, createCache } from "@drupal-api-client/json-api-client";
import { GraphqlClient } from "@drupal-api-client/graphql-client";
import { DecoupledRouterClient } from "@drupal-api-client/decoupled-router-client";
import { Jsona } from "jsona";

export const client = new JsonApiClient(
  import.meta.env.PUBLIC_DRUPAL_BASE_URL,
  {
    serializer: new Jsona(),
    cache: import.meta.env.MODE === "development" ? undefined : createCache(),
    debug: import.meta.env.MODE === "development",
    authentication: {
      type: "OAuth",
      credentials: {
        clientId: import.meta.env.CLIENT_ID,
        clientSecret: import.meta.env.CLIENT_SECRET,
      },
    },
  },
);

export const graphqlClient = new GraphqlClient(
  import.meta.env.PUBLIC_DRUPAL_BASE_URL,
  {
    debug: import.meta.env.MODE === "development",
    authentication: {
      type: "OAuth",
      credentials: {
        clientId: import.meta.env.CLIENT_ID,
        clientSecret: import.meta.env.CLIENT_SECRET,
      },
    },
  },
);

export const router = new DecoupledRouterClient(
  import.meta.env.PUBLIC_DRUPAL_BASE_URL,
  { cache: createCache(), debug: import.meta.env.MODE === "development" },
);
