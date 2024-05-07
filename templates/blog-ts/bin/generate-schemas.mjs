import * as fs from "fs";
import { JsonApiClient } from "@drupal-api-client/json-api-client";
import { jsonToZod } from "json-to-zod";

const client = new JsonApiClient(process.env.DRUPAL_BASE_URL);
const zodImport = "import { z } from 'astro:content';\n\nexport ";

const writeSchema = (schema, fileName) => {
  fs.writeFile(fileName, zodImport, { flag: "w" }, (err) => {
    if (err) {
      console.error(err);
    } else {
      fs.appendFile(fileName, schema, (err) => {
        if (err) {
          console.error(err);
        } else {
          // file written successfully
        }
      });
    }
  });
};

console.log("Generating schemas...");

// Generate a schema for an article collection.
const articles = await client.getCollection("node--article", {
  queryString: "include=field_image",
});
const articlesSchema = jsonToZod(articles).replace(
  "const schema",
  "const articlesSchema"
);
writeSchema(articlesSchema, "src/lib/schemas/articlesSchema.ts");

// Generate a schema for a file resource
const file = await client.getCollection("file--file");
const fileSchema = jsonToZod(file.data[0]).replace(
  "const schema",
  "const fileSchema"
);
writeSchema(fileSchema, "src/lib/schemas/fileSchema.ts");
