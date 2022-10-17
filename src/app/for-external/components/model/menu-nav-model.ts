/**
 * Created by 6396000843 on 2017/8/17.
 */

export class ComponentMenuNav {
  category: string;
  nodes: ComponentMenuItem[];
}

export class ComponentMenuItem {
  label: string;
  router: string;
  subRouter: string;
  docOnly?: boolean;
  api?: string;
  href?: string;
  target?: string;
}



