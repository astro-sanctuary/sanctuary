// Pick up here, getting the types right

export interface NodeBasicPage {
  __typename: "NodePage";
  id: string;
  body: {
    summary: string;
    processed: string;
  };
  title: string;
}

export interface NodeArticle {
  __typename: "NodeArticle";
  id: string;
  title: string;
  body: {
    summary: string;
    processed: string;
  };
  image: {
    url: string;
    alt: string;
  };
  created: {
    time: string;
  };
  changed: {
    time: string;
  };
}

export interface NodeResult {
  data: {
    route: {
      entity: NodeBasicPage | NodeArticle;
    };
  };
}

export interface PreviewResult {
  data: {
    preview: NodeBasicPage | NodeArticle;
  };
}

export interface ArticleListResult {
  data: {
    nodeArticles: {
      edges: {
        node: NodeArticle & { path: string };
      }[];
    };
  };
}
