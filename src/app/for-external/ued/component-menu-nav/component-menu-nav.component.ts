import { AfterViewInit, Component } from '@angular/core';
import { componentGroup, routerConfigPC } from 'app/for-external/router-config';
import { Router } from '@angular/router';

const demoNavigationInfo = require('../../template/demo-navigation-info.json');

@Component({
  templateUrl: './component-menu-nav.component.html',
  styleUrls: ['./component-menu-nav.component.scss']
})
export class ComponentMenuNavComponent implements AfterViewInit {
  constructor(private _router: Router) {
  }
  public routerGroup: any[] = DemoListManager.fullRouterConfig;

  public getUrl(router): string {
    return `/components/${router.path}`;
  }

  public getRouterLabel(router):string{
    return demoNavigationInfo[router.path]?.label || '';
  }

  public isSelected(url): boolean {
    return this._router.url.split('/').pop() === url.path;
  }

  public scrollToTop(): void {
    window.scrollTo(0, 0)
  }

  ngAfterViewInit(): void {
      if(this._router.url == '/components') {
        return
      }

      const activeNav = document.querySelector('ul.menu-nav-group-child a.active');
      if (activeNav) {
        activeNav.scrollIntoView({block: "center"});
      }
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
