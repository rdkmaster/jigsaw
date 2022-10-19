import { Component, OnDestroy, OnInit } from '@angular/core';
import { componentGroup, routerConfigPC } from 'app/for-external/router-config';
import { ActivatedRoute, Router } from '@angular/router';

class ComponentMenuNav {
  category: string;
  nodes: ComponentMenuItem[];
}

class ComponentMenuItem {
  label: string;
  router: string;
  subRouter: string;
  docOnly?: boolean;
  api?: string;
  href?: string;
  target?: string;
}

@Component({
  templateUrl: './component-menu-nav.component.html',
  styleUrls: ['./component-menu-nav.component.scss']
})
export class ComponentMenuNavComponent {

  public routerGroup: any[] = DemoListManager.fullRouterConfig;

  public getUrl(router): string {
    return `/components/${router.path}`;
  }

  componentMenuConfig: ComponentMenuNav[];
  selectedMenuLabel: string;

  constructor(private _router: Router) {
  }

  public isSelected(url): boolean {
    return this._router.url.split('/').pop() === url.path;
  }
}

export class DemoListManager {
  public static get fullRouterConfig() {
    const routerGroup = [
      { groupName: componentGroup.start, routers: [] },
      { groupName: componentGroup.general, routers: [] },
      { groupName: componentGroup.entry, routers: [] },
      { groupName: componentGroup.display, routers: [] },
      { groupName: componentGroup.navigation, routers: [] },
      { groupName: componentGroup.message, routers: [] },
      { groupName: componentGroup.container, routers: [] },
      { groupName: componentGroup.layout, routers: [] },
      { groupName: componentGroup.directive, routers: [] },
      { groupName: componentGroup.service, routers: [] },
      { groupName: componentGroup.other, routers: [] }
    ]
    routerConfigPC.forEach(router => {
      if (router.group === undefined) {
        routerGroup.find(item => item.groupName === componentGroup.other).routers.push(router);
      } else {
        routerGroup.find(item => item.groupName === router.group).routers.push(router);
      }
    })
    routerGroup.forEach(group => {
      group.routers.sort((item1, item2) => item1.path.localeCompare(item2.path))
    })
    return routerGroup;
  }
}