import { absoluteUrl } from "@/lib/utils.ts";

// TODO - these interfaces could be consolidated.

interface Node {
  type: string;
  drupal_internal__nid: number;
}

interface Entity {
  type: string;
  drupal_internal__id: number;
}

interface ToolbarProps {
  edit: string;
  iframe: string;
}

export const getToolbarProps = ({
  node,
  props,
  entity,
}: {
  node?: Node;
  props?: ToolbarProps;
  entity?: Entity;
}) => {
  let dataSanctuary = {};
  if (entity) {
    const [type] = entity.type.split("--");
    dataSanctuary = {
      edit: absoluteUrl(
        `/frontend-editing/form/${type}/${entity.drupal_internal__id}`,
      ),
      iframe: absoluteUrl(
        `/frontend-editing/form/${type}/${entity.drupal_internal__id}`,
      ),
    };
  }
  if (node) {
    const [type] = node.type.split("--");
    dataSanctuary = {
      edit: absoluteUrl(`/${type}/${node.drupal_internal__nid}/edit`),
      iframe: absoluteUrl(
        `/frontend-editing/form/${type}/${node.drupal_internal__nid}`,
      ),
    };
  }
  if (props) {
    dataSanctuary = {
      edit: absoluteUrl(props.edit),
      iframe: absoluteUrl(props.iframe),
    };
  }
  return {
    "data-sanctuary": JSON.stringify(dataSanctuary),
  };
};
