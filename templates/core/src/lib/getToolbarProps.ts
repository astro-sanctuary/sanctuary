import { absoluteUrl } from "@/lib/utils.ts";

interface Node {
  title: string;
  drupal_internal__nid: number;
}

export const getToolbarProps = (node: Node) => {
  const props = {
    title: node.title,
    edit: absoluteUrl(`/node/${node.drupal_internal__nid}/edit`),
  };
  return {
    "data-sanctuary": JSON.stringify(props),
  };
};
