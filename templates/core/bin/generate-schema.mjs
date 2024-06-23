import * as fs from "fs";
import { client } from "../client.js";
import { jsonToZod } from "json-to-zod";

// Example usage:
// node --env-file=.env bin/generate-schema.mjs "node--article" "nodeArticleWithImage" "include=field_image"

// TODO - convert to TS
// Create a script that generates schema from an array of endpoints in a config file

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

console.log("Generating schema...");

// TODO: Re-implement with commander for args?
const resourceType = process.argv[2];
const schemaName = process.argv[3];
const queryString = process.argv[4];

// Get a collection response to generate a schema from.
const collection = await client.getCollection(resourceType, { queryString });

const schema = jsonToZod(collection).replace(
  "const schema",
  `const ${schemaName}Schema`
);
writeSchema(schema, `src/lib/schemas/${schemaName}Schema.ts`);
