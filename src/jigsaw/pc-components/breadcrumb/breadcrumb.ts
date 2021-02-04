import {
    AfterContentInit,
    Component,
    ContentChildren,
    forwardRef,
    Input,
    Output,
    EventEmitter,
    NgModule,
    OnDestroy,
    Optional,
    QueryList,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from "@angular/core";
import {NavigationEnd, Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {Subscription} from "rxjs";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {AbstractJigsawComponent} from "../../common/common";

export type BreadcrumbRouteConfig = {
    [url: string]: BreadcrumbNode | BreadcrumbGenerator;
}

export type BreadcrumbNode = {
    /**
     * 单节点在面包屑中的显示文本
     */
    label: string | BreadcrumbGenerator,
    /**
     * 字体的class，支持@rdkmaster/icon-font符号图标
     */
    icon?: string | BreadcrumbGenerator,
    /**
     * 节点链接，一般不填的会自动生成
     */
    routeLink?: string;
    /**
     * 面包屑节点说明，当这个值有效时，Jigsaw会在节点后添加一个问号图标。
     * $demo = breadcrumb/hints
     */
    hint?: string;
}

export type BreadcrumbGenerator = (routeNode: string) => BreadcrumbNode | BreadcrumbNode[];

@Component({
    selector: "jigsaw-breadcrumb, j-breadcrumb",
    templateUrl: "breadcrumb.html",
    host: {
        "[class.jigsaw-breadcrumb]": "true",
        "[class.jigsaw-breadcrumb-light]": 'theme == "light"',
        "[class.jigsaw-breadcrumb-dark]": 'theme == "dark"',
        "[class.jigsaw-breadcrumb-inner]": 'theme == "inner"'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawBreadcrumb extends AbstractJigsawComponent implements OnDestroy, AfterContentInit {
    constructor(private _router: Router, private _changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    private _removeRouterEventSubscriber: Subscription;
    private _removeItemChangeSubscriber: Subscription;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public separatorType: "icon" | "text" = "icon";

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public separator: string = "iconfont iconfont-e144";

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public generatorContext: any;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public theme: "light" | "dark" | "inner" = "light";

    /**
     * 超过这个值的时候面包屑会折叠中间的部分
     * @internal
     */
    @Input()
    public foldThreshold: number = Infinity;

    private _routesConfig: BreadcrumbRouteConfig[];

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get routesConfig(): BreadcrumbRouteConfig[] {
        return this._routesConfig;
    }

    public set routesConfig(value: BreadcrumbRouteConfig[]) {
        if (!value || this._routesConfig == value) {
            return;
        }
        this._routesConfig = value;
        this.runMicrotask(() => {
            // _generateBreadcrumb需要用到generatorContext这个输入属性，这里需要异步执行
            this._changeDetectorRef.markForCheck();
            this.data = this._generateBreadcrumb(this._router.url);
        });
        if (this._removeRouterEventSubscriber) {
            this._removeRouterEventSubscriber.unsubscribe();
            this._removeRouterEventSubscriber = null;
        }
        this._removeRouterEventSubscriber = this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this._changeDetectorRef.markForCheck();
                this.data = this._generateBreadcrumb(event.url);
            }
        });
    }

    @ContentChildren(forwardRef(() => JigsawBreadcrumbItem))
    private _items: QueryList<JigsawBreadcrumbItem>;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public data: (string | BreadcrumbNode)[] = [];

    /**
     * @internal
     */
    public _$getLabel(item: string | BreadcrumbNode) {
        return typeof item === "string" ? item : item.label;
    }

    private _generateBreadcrumb(url: string, data?: (string | BreadcrumbNode)[]): (string | BreadcrumbNode)[] {
        data = data ? data : [];
        if (!url) {
            return data;
        }
        let routeConfig = this.routesConfig.find(route => {
            let configUrl = Object.keys(route)[0];
            if (!configUrl) {
                return false;
            }
            configUrl = configUrl[0] == "/" ? configUrl : "/" + configUrl;
            let urlRegStr = "^" + configUrl.replace(/([\[\]\-|(){}^.+?$=!,\\])/g, "\\$1").replace(/\*/g, "[^/]+/?") + "$";
            return new RegExp(urlRegStr).test(url);
        });
        if (routeConfig) {
            const urlNode = url.slice(url.lastIndexOf("/") + 1);
            let breadcrumbNodeTemp: any = routeConfig[Object.keys(routeConfig)[0]];
            breadcrumbNodeTemp = typeof breadcrumbNodeTemp == "function" ? CommonUtils.safeInvokeCallback(this.generatorContext, breadcrumbNodeTemp, [decodeURIComponent(urlNode)]) : breadcrumbNodeTemp;
            breadcrumbNodeTemp = breadcrumbNodeTemp instanceof Array ? breadcrumbNodeTemp : [breadcrumbNodeTemp];
            breadcrumbNodeTemp.reverse().forEach((breadcrumbNode: BreadcrumbNode) => {
                // 拷贝一份，保证原数据不变
                breadcrumbNode = Object.assign({}, breadcrumbNode);
                breadcrumbNode.routeLink = breadcrumbNode.routeLink ? breadcrumbNode.routeLink : decodeURI(url);
                data.unshift(breadcrumbNode);
            });
        }

        return this._generateBreadcrumb(url.slice(0, url.lastIndexOf("/") == -1 ? 0 : url.lastIndexOf("/")), data);
    }

    @Output()
    public select: EventEmitter<string | BreadcrumbNode> = new EventEmitter<string | BreadcrumbNode>();

    /**
     * @internal
     */
    public _$itemSelect(item: string | BreadcrumbNode) {
        this.select.emit(item);
    }

    ngAfterContentInit() {
        if (this._items) {
            if (this._items.last) {
                this.runMicrotask(() => {
                    this._items.last.isLast = true;
                });
            }
            if (this._removeItemChangeSubscriber) {
                this._removeItemChangeSubscriber.unsubscribe();
                this._removeItemChangeSubscriber = null;
            }
            this._removeItemChangeSubscriber = this._items.changes.subscribe(() => {
                if (this._items.last) {
                    this.runMicrotask(() => {
                        this._items.last.isLast = true;
                    });
                }
            });
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
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
        <span 
            class="jigsaw-breadcrumb-separator" 
            *ngIf="!isLast && (separatorType === 'text')">{{separator}}
        </span>
        <span 
            class="jigsaw-breadcrumb-separator" 
            *ngIf="!isLast && (separatorType === 'icon')">
            <i class="{{separator}}"></i>
        </span>
        `,
    host: {
        '[class.jigsaw-breadcrumb-item]': 'true',
        '[class.jigsaw-breadcrumb-current]': 'isLast'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class JigsawBreadcrumbItem {
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public isLast: boolean;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public separatorType: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public separator: string;
}

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [JigsawBreadcrumb, JigsawBreadcrumbItem],
    exports: [JigsawBreadcrumb, JigsawBreadcrumbItem]
})
export class JigsawBreadcrumbModule {
}
