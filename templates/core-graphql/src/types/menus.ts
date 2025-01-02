// TODO - generate types using GraphQL Codegen (or alternative)

type MenuItem = {
  id: string;
  title: string;
  url: string;
};

type SocialMenuItem = MenuItem & {
  extras: {
    icon: string;
  };
};

export interface MenuResult {
  data: {
    menu: {
      items: MenuItem[];
    };
  };
}

export interface SocialMenuResult {
  data: {
    menu: {
      items: SocialMenuItem[];
    };
  };
}
