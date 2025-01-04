// Pick up here, getting the types right

export interface NodeBasicPage {
  __typename: string;
  id: string;
  body: {
    processed: string;
  };
  title: string;
}

export interface NodeResult {
  data: {
    route: {
      entity: NodeBasicPage;
    };
  };
}
