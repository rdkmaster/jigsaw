import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ComponentMenuService} from "../service/component.service";
import {ComponentMenuItem, ComponentMenuNav} from "../model/menu-nav-model"
import 'rxjs/add/operator/filter';
import {fade} from "../../animations/fade";

// enableProdMode();


@Component({
  templateUrl: './component-menu-nav.component.html',
  styleUrls: ['./component-menu-nav.component.scss'],
  animations: [fade]
})
export class ComponentMenuNavComponent implements OnInit, OnDestroy {

  componentMenuConfig: ComponentMenuNav[];
  subscription: any;
  selectedMenuLabel: string;

  constructor(private componentService: ComponentMenuService,
              private route: ActivatedRoute,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    this.loadMenuNav();


    this.subscription = this.router.events.subscribe(e => {
      if (!(e instanceof NavigationEnd)) {
        return;
      }
      this.updateSelectMenuFromUrl()
    });

    this.subscription = this.route.url.subscribe(() => this.updateSelectMenuFromUrl());
  }

  updateSelectMenuFromUrl() {
    if (this.router.url.match(/^\/components(\/introduce)?$/)) {
      this.router.navigate(['/components/introduce']);
      this.selectedMenuLabel = null;
      return;
    }

    if (this.selectedMenuLabel) {
      return;
    }
    const match = this.router.url.match(/^\/components(\/api)?\/([_A-z0-9-]+)\/([_A-z0-9-]+)(#.*)?$/);
    if (!match) {
      return;
    }
    const router = match[1] ? 'api' : match[2];
    const sub = match[1] ? '' : match[3];
    const menu = this.componentService.getComponentMenuNav(router, sub);
    if (!menu) {
      return;
    }
    this.selectedMenuLabel = menu.label;
  }

  loadMenuNav() {
    //resolver守卫中获取菜单:
    this.route.data
      .subscribe((data: { menuNavList: ComponentMenuNav[] }) => {
        this.componentMenuConfig = data.menuNavList;
        this.componentService.menuNavList = data.menuNavList;
      });
  }

  isSelected(componentMenuNav: ComponentMenuItem): boolean {
    return componentMenuNav.label === this.selectedMenuLabel;
  }

  showComponentDetail(componentMenuNav: ComponentMenuItem) {
    if (componentMenuNav.href) {
      window.open(componentMenuNav.href, componentMenuNav.target || '_self');
      return;
    }

    const router = [componentMenuNav.router, componentMenuNav.subRouter || 'api'];
    this.selectedMenuLabel = componentMenuNav.label;
    this.router.navigate(router, {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
