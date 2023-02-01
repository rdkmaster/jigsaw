import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    ElementRef,
    EmbeddedViewRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {AbstractJigsawComponent} from "../../common/common";
import {IJigsawTabTitleRenderer} from "./tab-renderer";

/**
 * 改变tab标题时发送事件的携带数据类型。
 */
export class TabTitleInfo {
    key: number;
    title: string
}

@Directive()
export abstract class JigsawTabItemBase extends AbstractJigsawComponent implements OnDestroy {

    protected constructor(protected _changeDetector: ChangeDetectorRef, protected _componentFactory: ComponentFactoryResolver) {
        super()
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public key: number;

    /**
     * string类型是在直接使用tab-bar时传入的
     * 而模板类型，是在tab中使用tab-bar，自动传入的TemplateRef实例
     * @NoMarkForCheckRequired
     */
    @Input()
    public tabItem: TemplateRef<any> | Type<IJigsawTabTitleRenderer> | string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public initData: Object;

    /**
     * 这个title属性，用于接收在使用渲染器标题时，传入的初始值
     * @NoMarkForCheckRequired
     */
    @Input()
    public title: string;

    @ViewChild('body', {read: ViewContainerRef})
    protected _body: ViewContainerRef;

    /**
     * @internal
     */
    public _tabItemRef: EmbeddedViewRef<any> | ComponentRef<IJigsawTabTitleRenderer>;

    protected _insert(): void {
        if (this._$isSimpleTabItem || !!this._tabItemRef) {
            return;
        }
        // 这里tabItem不可能是字符串
        const tabItem = <TemplateRef<any> | Type<IJigsawTabTitleRenderer>>this.tabItem;
        this._tabItemRef = this._createTab(tabItem, this.initData);
        this._changeDetector.detectChanges();
    }

    protected _destroy(): void {
        if (this._tabItemRef) {
            this._tabItemRef.destroy();
            this._tabItemRef = null;
        }
    }

    protected _createTab(what: Type<IJigsawTabTitleRenderer> | TemplateRef<any>,
                         initData: Object): EmbeddedViewRef<any> | ComponentRef<IJigsawTabTitleRenderer> {
        if (this._$isSimpleTabItem) {
            return undefined;
        }
        if (what instanceof TemplateRef) {
            return this._body.createEmbeddedView(what, initData);
        }
        if (what) {
            const factory = this._componentFactory.resolveComponentFactory(what);
            const componentRef = this._body.createComponent(factory);
            componentRef.instance.initData = initData;
            componentRef.instance.title = this.title;
            return componentRef;
        }
    }

    /**
     * @internal
     */
    public get _$isSimpleTabItem(): boolean {
        return typeof this.tabItem == 'string';
    }

    ngOnDestroy() {
        this._destroy()
    }
}

/**
 * @internal
 */
@Component({
    selector: 'jigsaw-tab-label',
    template: `
        <div *ngIf="_$isSimpleTabItem; else body" class="jigsaw-tabs-simple-content">
            <span *ngIf="icon" [ngClass]="icon"></span>
            <span [trustedHtml]="tabItem" [trustedHtmlContext]="htmlContext"></span>
        </div>
        <ng-template #body></ng-template>
        <span class="jigsaw-tabs-remove-bar" *ngIf="editable" (click)="_$handleRemove($event)">
            <i class="iconfont iconfont-e9b8"></i>
        </span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTabLabel extends JigsawTabItemBase implements AfterViewInit {

    constructor(public elementRef: ElementRef,
                protected _changeDetector: ChangeDetectorRef,
                protected _componentFactory: ComponentFactoryResolver) {
        super(_changeDetector, _componentFactory)
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public editable: boolean;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public icon: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public htmlContext: any;

    @Output()
    public remove = new EventEmitter<number>();

    @Output()
    public labelChange = new EventEmitter<TabTitleInfo>();

    // label 左侧的距离
    public getOffsetLeft(): number {
        return this.elementRef.nativeElement.offsetLeft;
    }

    public getOffsetTop(): number {
        return this.elementRef.nativeElement.offsetTop;
    }

    // 组件的宽度
    public getOffsetWidth(): number {
        return this.elementRef.nativeElement.offsetWidth;
    }

    /**
     * @internal
     */
    public _$handleRemove(e) {
        e.preventDefault();
        e.stopPropagation();
        this.remove.emit(this.key);
    }

    ngAfterViewInit() {
        if (!this._$isSimpleTabItem) {
            this._insert();
        }
    }
}

/**
 * @internal
 */
@Component({
    selector: 'jigsaw-tab-content',
    host: {
        '[class.jigsaw-tabs-tabpane]': 'true',
        '[class.jigsaw-tabs-tabpane-active]': 'isActive',
        '[class.jigsaw-tabs-tabpane-inactive]': '!isActive'
    },
    template: `
        <ng-template #body></ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTabContent extends JigsawTabItemBase implements AfterViewInit {

    constructor(protected _changeDetector: ChangeDetectorRef, protected _componentFactory: ComponentFactoryResolver) {
        super(_changeDetector, _componentFactory)
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public lazy: boolean;

    private _isActive: boolean;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get isActive(): boolean {
        return this._isActive;
    }

    public set isActive(active: boolean) {
        this._isActive = active;
        if (this.initialized && active) {
            this._insert();
        }
    }

    ngAfterViewInit() {
        if (!this.lazy || this._isActive) {
            // 同步加载，或者处于激活状态
            this._insert();
        }
    }
}
