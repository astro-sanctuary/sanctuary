import * as fs from "fs";
import { client } from "../src/lib/client.js";
import { jsonToZod } from "json-to-zod";

// TODO - convert to TS
// Abstract this to be a more generic generate schema function

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
const collection = await client.getCollection("node--page");

const schema = jsonToZod(collection).replace(
  "const schema",
  "const nodePageSchema"
);
writeSchema(schema, "src/lib/schemas/nodePageSchema.ts");
