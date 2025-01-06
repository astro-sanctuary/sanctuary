import { absoluteUrl } from "@/lib/utils.ts";

// TODO - these interfaces could be consolidated.

interface NodeJsonApi {
  type: string;
  drupal_internal__nid: number;
}

interface NodeGraphQl {
  __typename: string;
  id: string;
}

interface Entity {
  type: string;
  drupal_internal__id?: number;
  meta?: { entity_id: string } | Array<unknown>;
  [key: string]: any;
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
  node?: NodeJsonApi | NodeGraphQl;
  props?: ToolbarProps;
  entity?: Entity;
}) => {
  let dataSanctuary = {};
  if (entity) {
    const [type] = entity.type.split("--");
    let id: number | string;
    switch (type) {
      case "menu_link_content":
        // If entity.meta is an array, the menu link isn't editable.
        if (Array.isArray(entity.meta)) {
          id = "";
        } else {
          id = entity?.meta?.entity_id ? entity?.meta.entity_id : "";
        }
        break;
      default:
        if (entity.id) {
          id = entity.id;
        } else {
          id = entity?.drupal_internal__id ? entity.drupal_internal__id : "";
        }
        break;
    }
    if (id === "") return {};
    dataSanctuary = {
      edit: absoluteUrl(`/frontend-editing/form/${type}/${id}`),
      iframe: absoluteUrl(`/frontend-editing/form/${type}/${id}`),
    };
  }
  if (node) {
    // JSON:API
    if ("type" in node) {
      dataSanctuary = {
        edit: absoluteUrl(`/node/${node.drupal_internal__nid}/edit`),
        iframe: absoluteUrl(
          `/frontend-editing/form/node/${node.drupal_internal__nid}`,
        ),
      };
    }
    // GraphQL
    if ("__typename" in node) {
      dataSanctuary = {
        edit: absoluteUrl(`/node/${node.id}/edit`),
        iframe: absoluteUrl(`/frontend-editing/form/node/${node.id}`),
      };
    }
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
