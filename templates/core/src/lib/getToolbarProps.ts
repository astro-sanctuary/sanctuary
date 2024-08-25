import { absoluteUrl } from "@/lib/utils.ts";

interface Node {
  title: string;
  drupal_internal__nid: number;
}

export const getToolbarProps = (node: Node) => {
  const props = {
    title: node.title,
    edit: absoluteUrl(`/node/${node.drupal_internal__nid}/edit`),
    iframe: absoluteUrl(
      `/frontend-editing/form/node/${node.drupal_internal__nid}?view_mode_id=full`,
    ),
  };
  return {
    "data-sanctuary": JSON.stringify(props),
  };
};
