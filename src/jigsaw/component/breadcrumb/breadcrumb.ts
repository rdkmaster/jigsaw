import {AfterContentInit, Component, ContentChildren, forwardRef, Input, NgModule, OnDestroy, Optional, QueryList} from "@angular/core";
import {NavigationEnd, Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {Subscription} from "rxjs/Subscription";
import {BreadcrumbData} from "../../core/data/breadcrumb-data";
import {CommonUtils} from "../../core/utils/common-utils";

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

    private _routesConfig: BreadcrumbData;

    @Input()
    public get routesConfig(): BreadcrumbData {
        return this._routesConfig;
    }

    public set routesConfig(value: BreadcrumbData) {
        if (!value || this._routesConfig == value) return;
        this._routesConfig = value;
        this._generateBreadcrumb(this._router.url);
        if (this._removeRouterEventSubscriber) {
            this._removeRouterEventSubscriber.unsubscribe();
            this._removeRouterEventSubscriber = null;
        }
        this._removeRouterEventSubscriber = this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this._generateBreadcrumb(event.url);
            }
        })
    }

    @ContentChildren(forwardRef(() => JigsawBreadcrumbItem))
    private _items: QueryList<JigsawBreadcrumbItem>;

    public _$routeNavList: BreadcrumbData[] = [];

    private _findBreadcrumbItemByRoutes(routes: BreadcrumbData, routeNode: string): BreadcrumbData {
        if (!routes || !routeNode) return null;
        let searchRoute = routes instanceof Array ? routes : routes.nodes;
        if (!searchRoute) return null;
        return searchRoute.find(r => r.route == routeNode || r.route == '*');
    }

    private _generateBreadcrumb(url: string) {
        const routeNavList = [];
        if (!url || url == '/') return;
        const routeNodes = url.slice(1).split('/');
        for (let i = 0; i < routeNodes.length; i++) {
            const routeNode = routeNodes[i];
            const routes = i == 0 ? this._routesConfig : routeNavList[i - 1];
            let breadcrumb = this._findBreadcrumbItemByRoutes(routes, routeNode);
            if (!breadcrumb) {
                console.warn('The breadcrumb cannot find this route config: ' + url);
                break;
            }
            // 拷贝一份，保证原数据不变
            breadcrumb = Object.assign({}, breadcrumb);
            breadcrumb.routeLink = breadcrumb.routeLink ? breadcrumb.routeLink :
                (breadcrumb.route[0] == '/' ? breadcrumb.route : '/' + routeNodes.slice(0, i + 1).join('/'));
            breadcrumb.label = typeof breadcrumb.label == 'function' ? breadcrumb.label(decodeURI(routeNode)) : breadcrumb.label;
            breadcrumb.icon = typeof breadcrumb.icon == 'function' ? breadcrumb.icon(decodeURI(routeNode)) : breadcrumb.icon;
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
