import {AfterContentInit, Component, ContentChildren, forwardRef, Input, NgModule, OnDestroy, Optional, QueryList} from "@angular/core";
import {NavigationEnd, Router, RouterModule} from "@angular/router";
import {TreeData} from "../../core/data/tree-data";
import {CommonModule} from "@angular/common";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'jigsaw-breadcrumb, j-breadcrumb',
    templateUrl: 'breadcrumb.html',
    host: {
        '[class.jigsaw-breadcrumb]': 'true'
    }
})
export class JigsawBreadcrumb implements OnDestroy, AfterContentInit {
    constructor(private _router: Router) {

    }

    private _removeRouterEventSubscriber: Subscription;
    private _removeItemChangeSubscriber: Subscription;

    @Input()
    public separator: string = '/';

    private _routes: TreeData;

    @Input()
    public get routes(): TreeData {
        return this._routes;
    }

    public set routes(value: TreeData) {
        if (!value || this._routes == value) return;
        this._routes = value;
        this._generateBreadcrumb(this._router.url);
        if (this._removeRouterEventSubscriber) {
            this._removeRouterEventSubscriber.unsubscribe();
            this._removeRouterEventSubscriber = null;
        }
        this._removeRouterEventSubscriber = this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                console.log(event.url);
                this._generateBreadcrumb(event.url);
            }
        })
    }

    @ContentChildren(forwardRef(() => JigsawBreadcrumbItem))
    private _items: QueryList<JigsawBreadcrumbItem>;

    public _$routeNavList: any[] = [];

    private _findBreadcrumbItemByRoutes(routes: TreeData, routeNode: string): TreeData {
        if (!routes || !routeNode) return null;
        let searchRoute = routes instanceof Array ? routes : routes.nodes;
        if (!searchRoute) return null;
        return searchRoute.find(r => r.route == routeNode || r.route.indexOf(routeNode + '/') == 0 ||
            r.route == '*');
    }

    private _generateBreadcrumb(url: string) {
        const routeNavList = [];
        if (!url || url == '/') return;
        const routeNodes = url.slice(1).split('/');
        // 跳过的route node，主要支持路由path有多个/的情况
        const skipIndex = [];
        for (let i = 0; i < routeNodes.length; i++) {
            if(skipIndex.find(sIndex => sIndex === i)) continue;
            const routes = i == 0 ? this._routes : routeNavList[i - 1 - skipIndex.length];
            let breadcrumb = this._findBreadcrumbItemByRoutes(routes, routeNodes[i]);
            if (!breadcrumb) {
                console.warn('The breadcrumb cannot find this route config: ' + url);
                break;
            }
            // 拷贝一份，保证原数据不变
            breadcrumb = Object.assign({}, breadcrumb);
            if(!breadcrumb.routeLink) {
                if(breadcrumb.route[0] == '/') {
                    breadcrumb.routeLink = breadcrumb.route;
                } else {
                    const matches = breadcrumb.route.match(/\//g);
                    breadcrumb.routeLink = '/' + routeNodes.slice(0, i + 1 + (matches ? matches.length : 0)).join('/');
                    matches && matches.forEach((m, idx) => {
                        skipIndex.push(i + idx + 1);
                    })
                }
            }
            routeNavList.push(breadcrumb);
        }
        this._$routeNavList = routeNavList.filter(rn => rn.visible !== false);
    }

    ngAfterContentInit() {
        if (this._items) {
            if (this._items.last) {
                this._items.last.isLast = true;
            }
            if (this._removeItemChangeSubscriber) {
                this._removeItemChangeSubscriber.unsubscribe();
                this._removeItemChangeSubscriber = null;
            }
            this._removeItemChangeSubscriber = this._items.changes.subscribe(() => {
                if (this._items.last) {
                    this._items.last.isLast = true;
                }
            })
        }
    }

    ngOnDestroy() {
        if (this._removeRouterEventSubscriber) {
            this._removeRouterEventSubscriber.unsubscribe();
            this._removeRouterEventSubscriber = null;
        }
        if (this._removeItemChangeSubscriber) {
            this._removeItemChangeSubscriber.unsubscribe();
            this._removeItemChangeSubscriber = null;
        }
    }
}

@Component({
    selector: 'jigsaw-breadcrumb-item, j-breadcrumb-item',
    template: `
        <ng-content></ng-content>
        <span class="jigsaw-breadcrumb-separator" *ngIf="!isLast">{{_$breadcrumbHost?.separator}}</span>`,
    host: {
        '[class.jigsaw-breadcrumb-item]': 'true',
        '[class.jigsaw-breadcrumb-current]': 'isLast'
    }
})
export class JigsawBreadcrumbItem {
    constructor(@Optional() public _$breadcrumbHost: JigsawBreadcrumb) {
    }

    @Input()
    public isLast: boolean;
}

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [JigsawBreadcrumb, JigsawBreadcrumbItem],
    exports: [JigsawBreadcrumb, JigsawBreadcrumbItem]
})
export class JigsawBreadcrumbModule {

}
