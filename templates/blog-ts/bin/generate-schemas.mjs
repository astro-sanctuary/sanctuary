import * as fs from "fs";
import { JsonApiClient } from "@drupal-api-client/json-api-client";
import { jsonToZod } from "json-to-zod";

export const client = new JsonApiClient(process.env.DRUPAL_BASE_URL);

console.log("Generating schemas...");

const articles = await client.getCollection("node--article", {
  queryString: "include=field_media_image.field_media_image",
});

const schema = jsonToZod(articles);
const zodImport = "import { z } from 'astro:content';\n\nexport ";

fs.writeFile("src/lib/article-schema.ts", zodImport, { flag: "w" }, (err) => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
});

fs.appendFile("src/lib/article-schema.ts", schema, (err) => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
});
