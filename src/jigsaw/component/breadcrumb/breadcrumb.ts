import {Component, Input, NgModule, OnDestroy, Optional} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
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
export class JigsawBreadcrumb implements OnDestroy {
    constructor(private _router: Router) {

    }

    private _removeRouterSubscriber: Subscription;

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
        if (this._removeRouterSubscriber) {
            this._removeRouterSubscriber.unsubscribe();
            this._removeRouterSubscriber = null;
        }
        this._removeRouterSubscriber = this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                console.log(event.url);
                this._$routeNavList = [];
                if (!event.url || event.url == '/') return;
                const routeNavList = event.url.slice(1).split('/');
                for (let i = 0; i < routeNavList.length; i++) {
                    const routes = i == 0 ? this._routes : this._$routeNavList[i - 1];
                    const breadcrumb = this._findBreadcrumbByRoutes(routes, routeNavList[i]);
                    if (!breadcrumb) {
                        console.warn('The breadcrumb cannot find this route config: ' + event.url);
                        break;
                    }
                    this._$routeNavList.push(breadcrumb);
                }
            }
        })
    }

    public _$routeNavList: any[] = [];

    private _findBreadcrumbByRoutes(routes: TreeData, routeNav: string): TreeData {
        if (!routes || !routeNav) return null;
        let searchRoute = routes instanceof Array ? routes : routes.nodes;
        if (!searchRoute) return null;
        return searchRoute.find(route => route.route == routeNav);
    }

    ngOnDestroy() {
        if (this._removeRouterSubscriber) {
            this._removeRouterSubscriber.unsubscribe();
            this._removeRouterSubscriber = null;
        }
    }
}

@Component({
    selector: 'jigsaw-breadcrumb-item, j-breadcrumb-item',
    template: `
        <ng-content></ng-content>{{_$breadcrumbHost.separator}}`,
    host: {
        '[class.jigsaw-breadcrumb-item]': 'true'
    }
})
export class JigsawBreadcrumbItem {
    constructor(@Optional() public _$breadcrumbHost: JigsawBreadcrumb) {
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawBreadcrumb, JigsawBreadcrumbItem],
    exports: [JigsawBreadcrumb, JigsawBreadcrumbItem]
})
export class JigsawBreadcrumbModule {

}
