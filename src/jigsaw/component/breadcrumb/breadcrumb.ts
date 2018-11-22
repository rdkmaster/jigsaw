import {AfterContentInit, Component, ContentChildren, forwardRef, Input, NgModule, OnDestroy, Optional, QueryList} from "@angular/core";
import {NavigationEnd, Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {Subscription} from "rxjs/Subscription";
import {CommonUtils} from "../../core/utils/common-utils";

export class BreadcrumbRouteConfig {
    [url: string]: BreadcrumbNode;
}

export type BreadcrumbNode = {
    /**
     * 单节点在面包屑中的显示文本
     */
    label: string | BreadcrumbGenerator,
    /**
     * 字体的class，支持font-awesome，icon-font
     */
    icon?: string | BreadcrumbGenerator,
    /**
     * 节点链接，一般不填的会自动生成
     */
    routeLink?: string;
}

export type BreadcrumbGenerator = (routeNode: string) => string;

@Component({
    selector: 'jigsaw-breadcrumb, j-breadcrumb',
    templateUrl: 'breadcrumb.html',
    host: {
        '[class.jigsaw-breadcrumb]': 'true',
        '[class.jigsaw-breadcrumb-light]': 'theme == "light"',
        '[class.jigsaw-breadcrumb-dark]': 'theme == "dark"',
        '[class.jigsaw-breadcrumb-white]': 'theme == "white"'
    }
})
export class JigsawBreadcrumb implements OnDestroy, AfterContentInit {
    constructor(private _router: Router) {
    }

    private _removeRouterEventSubscriber: Subscription;
    private _removeItemChangeSubscriber: Subscription;

    @Input()
    public separator: string = '/';

    @Input()
    public generatorContext: any;

    @Input()
    public theme: 'light' | 'dark' | 'white' = 'light';

    private _routesConfig: BreadcrumbRouteConfig[];

    @Input()
    public get routesConfig(): BreadcrumbRouteConfig[] {
        return this._routesConfig;
    }

    public set routesConfig(value: BreadcrumbRouteConfig[]) {
        if (!value || this._routesConfig == value) return;
        this._routesConfig = value;
        this._$breadcrumbNodes = this._generateBreadcrumb(this._router.url);
        if (this._removeRouterEventSubscriber) {
            this._removeRouterEventSubscriber.unsubscribe();
            this._removeRouterEventSubscriber = null;
        }
        this._removeRouterEventSubscriber = this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this._$breadcrumbNodes = this._generateBreadcrumb(event.url);
            }
        })
    }

    @ContentChildren(forwardRef(() => JigsawBreadcrumbItem))
    private _items: QueryList<JigsawBreadcrumbItem>;

    public _$breadcrumbNodes: BreadcrumbNode[] = [];

    private _generateBreadcrumb(url: string, breadcrumbNodes?: BreadcrumbNode[]): BreadcrumbNode[] {
        breadcrumbNodes = breadcrumbNodes ? breadcrumbNodes : [];
        if (!url) return breadcrumbNodes;
        let routeConfig = this.routesConfig.find(route => {
            let configUrl = Object.keys(route)[0];
            if (!configUrl) return false;
            configUrl = configUrl[0] == '/' ? configUrl : '/' + configUrl;
            let urlRegStr = '^' + configUrl.replace(/\*/g, '[^\/]+\/?') + '$';
            return new RegExp(urlRegStr).test(url);
        });
        if (routeConfig) {
            const urlNode = url.slice(url.lastIndexOf('/') + 1);
            // 找到option部分，拷贝一份，保证原数据不变
            const breadcrumbNode: BreadcrumbNode = Object.assign({}, routeConfig[Object.keys(routeConfig)[0]]);
            breadcrumbNode.routeLink = breadcrumbNode.routeLink ? breadcrumbNode.routeLink : url;
            breadcrumbNode.label = typeof breadcrumbNode.label == 'function' ?
                CommonUtils.safeInvokeCallback(this.generatorContext, breadcrumbNode.label, [urlNode]) : breadcrumbNode.label;
            breadcrumbNode.icon = typeof breadcrumbNode.icon == 'function' ?
                CommonUtils.safeInvokeCallback(this.generatorContext, breadcrumbNode.icon, [urlNode]) : breadcrumbNode.icon;
            breadcrumbNodes.unshift(breadcrumbNode);
        }
        return this._generateBreadcrumb(url.slice(0, url.lastIndexOf('/') == -1 ? 0 : url.lastIndexOf('/')), breadcrumbNodes);
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
