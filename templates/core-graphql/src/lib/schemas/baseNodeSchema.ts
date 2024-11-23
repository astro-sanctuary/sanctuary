import { z } from "astro:content";

export const baseNodeSchema = z.object({
  type: z.string(),
});
