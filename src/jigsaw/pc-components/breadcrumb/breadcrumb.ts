import {
    AfterContentInit,
    Component,
    ContentChildren,
    forwardRef,
    Input,
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
     * 字体的class，支持font-awesome，icon-font
     */
    icon?: string | BreadcrumbGenerator,
    /**
     * 节点链接，一般不填的会自动生成
     */
    routeLink?: string;
    /**
     * 注释链接
     */
    hint?: string;
}

export type BreadcrumbSeparator = {
    /**
     * Type => icon / text 
     */
    type: string;
    content: string;
};

export type BreadcrumbGenerator = (routeNode: string) => BreadcrumbNode | BreadcrumbNode[];

@Component({
    selector: 'jigsaw-breadcrumb, j-breadcrumb',
    templateUrl: 'breadcrumb.html',
    host: {
        '[class.jigsaw-breadcrumb]': 'true',
        '[class.jigsaw-breadcrumb-light]': 'theme == "light"',
        '[class.jigsaw-breadcrumb-dark]': 'theme == "dark"',
        '[class.jigsaw-breadcrumb-inner]': 'theme == "inner"'
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
    public separator: BreadcrumbSeparator = {
        type:"icon",
        content:"fa fa-angle-right"
    };

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public generatorContext: any;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public theme: 'light' | 'dark' | 'inner' = 'light';

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
            this._$breadcrumbNodes = this._generateBreadcrumb(this._router.url);
        });
        if (this._removeRouterEventSubscriber) {
            this._removeRouterEventSubscriber.unsubscribe();
            this._removeRouterEventSubscriber = null;
        }
        this._removeRouterEventSubscriber = this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this._changeDetectorRef.markForCheck();
                this._$breadcrumbNodes = this._generateBreadcrumb(event.url);
            }
        })
    }

    @ContentChildren(forwardRef(() => JigsawBreadcrumbItem))
    private _items: QueryList<JigsawBreadcrumbItem>;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public _$breadcrumbNodes: BreadcrumbNode[] = [];

    /* 超过这个值的时候面包屑会折叠中间的部分 */
    public _foldMin = 99;
    
    @Input()
    public get foldMin(){
        return this._foldMin
    }
    
    public set foldMin(v){
        this._foldMin = v;
    }

    private _generateBreadcrumb(url: string, breadcrumbNodes?: BreadcrumbNode[]): BreadcrumbNode[] {
        breadcrumbNodes = breadcrumbNodes ? breadcrumbNodes : [];
        if (!url) {
            return breadcrumbNodes;
        }
        let routeConfig = this.routesConfig.find(route => {
            let configUrl = Object.keys(route)[0];
            if (!configUrl) {
                return false;
            }
            configUrl = configUrl[0] == '/' ? configUrl : '/' + configUrl;
            let urlRegStr = '^' + configUrl.replace(/([\[\]\-|(){}^.+?$=!,\\])/g, '\\$1')
                .replace(/\*/g, '[^\/]+\/?') + '$';
            return new RegExp(urlRegStr).test(url);
        });
        if (routeConfig) {
            const urlNode = url.slice(url.lastIndexOf('/') + 1);
            let breadcrumbNodeTemp: any = routeConfig[Object.keys(routeConfig)[0]];
            breadcrumbNodeTemp = typeof breadcrumbNodeTemp == 'function' ?
                CommonUtils.safeInvokeCallback(this.generatorContext, breadcrumbNodeTemp, [decodeURIComponent(urlNode)]) : breadcrumbNodeTemp;
            breadcrumbNodeTemp = breadcrumbNodeTemp instanceof Array ? breadcrumbNodeTemp : [breadcrumbNodeTemp];
            breadcrumbNodeTemp.reverse().forEach((breadcrumbNode: BreadcrumbNode) => {
                // 拷贝一份，保证原数据不变
                breadcrumbNode = Object.assign({}, breadcrumbNode);
                breadcrumbNode.routeLink = breadcrumbNode.routeLink ? breadcrumbNode.routeLink : decodeURI(url);
                breadcrumbNodes.unshift(breadcrumbNode);
            })
        }

        return this._generateBreadcrumb(url.slice(0, url.lastIndexOf('/') == -1 ? 0 : url.lastIndexOf('/')), breadcrumbNodes);
    }

    ngAfterContentInit() {
        if (this._items) {
            if (this._items.last) {
                this.runMicrotask(() => {
                    this._items.last.isLast = true;
                })
            }
            if (this._removeItemChangeSubscriber) {
                this._removeItemChangeSubscriber.unsubscribe();
                this._removeItemChangeSubscriber = null;
            }
            this._removeItemChangeSubscriber = this._items.changes.subscribe(() => {
                if (this._items.last) {
                    this.runMicrotask(() => {
                        this._items.last.isLast = true;
                    })
                }
            })
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
            *ngIf="!getLast && (_$breadcrumbHost?.separator.type === 'text')">{{_$breadcrumbHost?.separator.content}}
        </span>
        <span 
            class="jigsaw-breadcrumb-separator" 
            *ngIf="!isLast && (_$breadcrumbHost?.separator.type === 'icon')">
            <i class="{{_$breadcrumbHost?.separator.content}}"></i>
        </span>
        `,
    host: {
        '[class.jigsaw-breadcrumb-item]': 'true',
        '[class.jigsaw-breadcrumb-current]': 'isLast'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawBreadcrumbItem {
    constructor(
        /**
         * @internal
         */
        @Optional() public _$breadcrumbHost: JigsawBreadcrumb
    ) { }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public isLast: boolean;

    public get getLast(){
        console.log(this.isLast,this)
        return this.isLast;
    }
}

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [JigsawBreadcrumb, JigsawBreadcrumbItem],
    exports: [JigsawBreadcrumb, JigsawBreadcrumbItem]
})
export class JigsawBreadcrumbModule {
}
