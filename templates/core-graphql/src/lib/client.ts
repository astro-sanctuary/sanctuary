import { GraphqlClient } from "@drupal-api-client/graphql-client";

export const client = new GraphqlClient(
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
