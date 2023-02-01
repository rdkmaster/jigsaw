import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ContentChildren,
    Directive,
    ElementRef,
    EmbeddedViewRef,
    EventEmitter,
    HostListener,
    Injector,
    Input,
    Output,
    QueryList,
    TemplateRef,
    Type,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
    Renderer2
} from '@angular/core';
import {JigsawTabPane} from "./tab-pane";
import {JigsawTabContent, JigsawTabLabel, TabTitleInfo} from "./tab-item";
import {AbstractJigsawComponent, IDynamicInstantiatable, WingsTheme} from "../../common/common";
import {Subscription} from "rxjs";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {IJigsawTabTitleRenderer} from "./tab-renderer";
import { CommonUtils } from '../../common/core/utils/common-utils';

export type TabBarData = {
    /**
     * 字符串类型的标题
     */
    label?: string,
    /**
     * 支持包含简单标签的HTML片段
     */
    html?: string,
    /**
     * 当配置了HTML内容时，搭配该属性，可以指定HTML运行的上下文
     */
    htmlContext?: any,
    disabled?: boolean,
    hidden?: boolean,
    /**
     * 显示在文本前面的图标
     */
    icon?: string,
    renderer?: IJigsawTabTitleRenderer
}

@Directive()
export abstract class JigsawTabBase extends AbstractJigsawComponent implements AfterViewInit, AfterViewChecked {
    protected constructor(protected _changeDetector: ChangeDetectorRef, protected _elementRef: ElementRef,
                          // @RequireMarkForCheck 需要用到，勿删
                          protected _injector: Injector) {
        super();
    }

    /**
     * @internal
     */
    public _$selectedIndex: number;

    /**
     * 当前选中的tab页编号，在双绑模式下，改变这个值可以实现选中tab页的切换。
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get selectedIndex(): number {
        return this._$selectedIndex;
    }

    public set selectedIndex(value: number) {
        if (this._$selectedIndex !== value && typeof value == 'number') {
            this._$selectedIndex = value;

            if (this.initialized) {
                this._handleSelectChange(value)
            }
            this._changeDetector.detectChanges();
        }
    }

    /**
     * @internal
     */
    public _$headless: boolean = false;

    /**
     * 控制tab头部是否显示
     *
     * $demo = tab/headless
     */
    @Input()
    @RequireMarkForCheck()
    public get headless(): boolean {
        return this._$headless;
    }

    public set headless(value: boolean) {
        if (this._$headless == value) {
            return;
        }
        this._$headless = value;
    }

    public _$tabPanes: TabBarData[] | QueryList<JigsawTabPane> = [];

    @Input()
    @RequireMarkForCheck()
    public get data(): any[] {
        return this._$tabPanes instanceof QueryList ? this._$tabPanes.toArray() : this._$tabPanes;
    }

    public set data(value: any[]) {
        if (this._$tabPanes == value) {
            return;
        }
        this._$tabPanes = value;
    }

    /**
     * @internal
     */
    private _backgroundColor: string;

    /**
     * 配置组件的背景颜色，使得页签部分与容器周围的背景色可以更好的融合在一起。
     *
     * $demo = tab/background
     * $demo = tab-bar/background
     */
    @Input()
    @RequireMarkForCheck()
    public get backgroundColor(): string {
        return this._backgroundColor;
    }

    public set backgroundColor(value: string) {
        if (!CommonUtils.isDefined(value)) {
            return;
        }
        this._elementRef.nativeElement.style.setProperty('--jigsaw-nav-background', value.trim());
    }

    /**
     * 控制tab显示添加和删除按钮
     *
     * @NoMarkForCheckRequired
     *
     * $demo = tab/editable
     */
    @Input()
    public editable: boolean;

    /**
     * 当所选的tab页发生变化时发出此事件，事件携带的是被选中的tab页实例，
     * 如果需要索引值，请使用`selectedIndexChange`事件。
     */
    @Output()
    public selectChange = new EventEmitter<JigsawTabPane | TabBarData>();

    /**
     * 当前选中的tab页编号发生变化时，发出此事件。
     * 事件携带的是索引值，如果需要获取更多信息，请参考`selectChange`事件。
     */
    @Output()
    public selectedIndexChange = new EventEmitter<number>();

    /**
     * 删除tab时，发出事件，携带删除的tab索引值
     *
     * $demo = tab/editable
     *
     */
    @Output()
    public remove = new EventEmitter<number>();

    /**
     * 发送add事件，携带tabs的实例
     *
     * $demo = tab/editable
     *
     */
    @Output()
    public add = new EventEmitter<JigsawTab>();

    /**
     * 改变tab标题时发送此事件，事件携带一个`TabTitleInfo`类型的数据。
     */
    @Output()
    public titleChange = new EventEmitter<TabTitleInfo>();

    /**
     * 控制tab显示为标签式 or 页签式
     *
     * @NoMarkForCheckRequired
     *
     * $demo = tab-bar/type
     */
    @Input()
    public tabType: 'label' | 'page' = 'label';

    /**
     * @internal
     */
    public _$selectTabStyle: object = {};

    /**
     * @internal
     */
    public _$inkBarStyle: object = {};

    /**
     * @internal
     */
    public _$tabList = [];

    /**
     * @internal
     */
    public _$showOverflowButton: boolean = false;

    protected _tabLeftMap: Map<number, number> = new Map<number, number>();

    /**
     * 在tab中需要通过tab-bar实例获取，这里要定义成public
     * @internal
     */
    @ViewChildren(JigsawTabLabel)
    public _tabLabels: QueryList<JigsawTabLabel>;

    /**
     * 在tab中需要通过tab-bar实例获取，这里要定义成public
     * @internal
     */
    @ViewChild('tabsInkBar')
    public _tabsInkBar: ElementRef;

    /**
     * 在tab中需要通过tab-bar实例获取，这里要定义成public
     * @internal
     */
    @ViewChild('tabsNavWrap')
    public _tabsNavWrap: ElementRef;

    /**
     * 在tab中需要通过tab-bar实例获取，这里要定义成public
     * @internal
     */
    @ViewChild('tabsNav')
    public _tabsNav: ElementRef;

    protected abstract get tabsInkBar(): ElementRef;

    protected abstract get tabsNavWrap(): ElementRef;

    protected abstract get tabsNav(): ElementRef;

    protected abstract get tabLabels(): QueryList<JigsawTabLabel>;

    protected _handleSelectChange(index) {
        this.selectChange.emit(this._getTabPaneByIndex(index));
        this.selectedIndexChange.emit(index);

        this._asyncSetStyle(index);
    }

    protected _getTabPaneByIndex(key): JigsawTabPane | TabBarData {
        return this._$tabPanes ? this._$tabPanes.find((item, index) => index === key) : undefined;
    }

    protected _asyncSetStyle(index: number): void {
        this.runMicrotask(() => this._setInkBarStyle(index));
    }

    // 将有纵向切换的封装.
    protected _getLabelOffsetByKey(key: number): any {
        let currentLabel = this.tabLabels.find(item => item.key === key);

        if (currentLabel) {
            return {
                offSet: currentLabel.getOffsetLeft(),
                width: currentLabel.getOffsetWidth()
            }
        } else {
            return null;
        }
    }

    protected _createTabList() {
        if (this._$headless || !this.tabsNavWrap) {
            return;
        }
        this._$tabList = [];
        this._tabLeftMap.clear();
        this.tabLabels.forEach((label: JigsawTabLabel, index) => {
            let title = "";
            let rootNodes = label._tabItemRef ? (<EmbeddedViewRef<any>>label._tabItemRef).rootNodes : null;
            if (rootNodes) {
                // 模板类型
                for (let i = 0; i < rootNodes.length; i++) {
                    if (rootNodes[i] instanceof HTMLElement) {
                        title += " " + rootNodes[i].outerHTML;
                    } else {
                        title += " " + rootNodes[i].textContent.trim();
                    }
                }
            } else if (label._tabItemRef && label._tabItemRef instanceof ComponentRef) {
                // 动态加载的自定义类型：渲染器
                title = (<IJigsawTabTitleRenderer>label._tabItemRef.instance).title;
            } else if (typeof label.tabItem == 'string') {
                title = label.tabItem;
            }
            this._$tabList.push(title.trim());
            let distance = label.getOffsetLeft() + label.getOffsetWidth() - this.tabsNavWrap.nativeElement.offsetWidth;
            this._tabLeftMap.set(index, distance > 0 ? (0 - distance) : 0);
        });
        this._updateOverflowButton();
        this._updateTitlePosition(this.selectedIndex);
    }

    protected _updateTitlePosition(index) {
        this._$selectTabStyle = {
            "left": this._tabLeftMap.get(index) + "px"
        };
    }

    protected _autoSelect() {
        this.selectedIndex = this.data.findIndex(tabPane => !tabPane.disabled && !tabPane.hidden);
    }

    private _setInkBarStyle(index: number) {
        if (!this.tabsInkBar || this.tabLabels.length == 0) return;

        let labelPos = this._getLabelOffsetByKey(index);
        if (!labelPos) {
            return;
        }

        this._$inkBarStyle = {
            'transform': 'translate3d(' + (labelPos.offSet + this._tabLeftMap.get(this.selectedIndex)) + 'px, 0px, 0px)',
            'width': labelPos.width + 'px'
        };
        this._changeDetector.markForCheck();
    }

    private _updateOverflowButton() {
        if (!this.tabsNav || !this.tabsNavWrap) return;
        this._$showOverflowButton = this.tabsNavWrap.nativeElement.offsetWidth < this.tabsNav.nativeElement.offsetWidth;
        this._changeDetector.detectChanges();
    }

    /**
     * 当前的tab页数量，包含被隐藏的tab页
     */
    public length: number;
    private _tabLabelsChangeHandler: Subscription;

    ngAfterViewInit() {
        this._createTabList();
        this._tabLabelsChangeHandler = this.tabLabels.changes.subscribe(() => this._createTabList());
        if (this.selectedIndex != null) {
            this._handleSelectChange(this.selectedIndex)
        } else {
            this._autoSelect();
        }

        this.length = this._$tabPanes.length;
    }

    ngOnDestroy() {
        if (this._tabLabelsChangeHandler) {
            this._tabLabelsChangeHandler.unsubscribe();
        }
    }

    // 注意此方法会被频繁调用，性能要求高
    ngAfterViewChecked() {
        if (!this.tabsInkBar || this.tabLabels.length == 0) {
            // ngFor的数据更新了需要markForCheck
            this._changeDetector.markForCheck();
            return;
        }
        this._createTabList();
        const labelPos = this._getLabelOffsetByKey(this.selectedIndex);
        if (!labelPos) {
            return;
        }

        const tabElem = this.tabsInkBar.nativeElement;
        if (tabElem.offsetWidth != labelPos.width) {
            this._asyncSetStyle(this.selectedIndex);
        } else {
            const match = (tabElem.style.transform + '').match(/\btranslate3d\s*\((\d+)px\s*,/);
            const styleOffset = match ? match[1] : -1;
            const labelOffset = labelPos.offSet + this._tabLeftMap.get(this.selectedIndex);
            // 当tab的宽度缩放到小于标题头的宽度时，这里会出现两个负值的偏移量，且不相等
            // 这里会一直重复计算，从而导致页面卡死
            if ((styleOffset >= 0 || labelOffset >= 0) && styleOffset != labelOffset) {
                this._asyncSetStyle(this.selectedIndex);
            }
        }
    }

    @HostListener('window:resize')
    onResize() {
        this._createTabList();
    }
}

@WingsTheme('tab.scss')
@Component({
    selector: 'jigsaw-tab-bar, j-tab-bar, jigsaw-tabs-bar, j-tabs-bar',
    templateUrl: 'tab-bar.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-tabs-bar-host]': 'true',
        '[class.jigsaw-tabs-page]': 'tabType == "page"'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTabBar extends JigsawTabBase {

    constructor(private _cfr: ComponentFactoryResolver,
                protected _changeDetector: ChangeDetectorRef,
                private _viewContainer: ViewContainerRef,
                // @RequireMarkForCheck 需要用到，勿删
                protected _injector: Injector,
                /**
                 * @internal
                 */
                public _elementRef: ElementRef) {
        super(_changeDetector, _elementRef, _injector);
    }

    /**
     * tab页点击
     * @internal
     */
    public _$tabClick(index) {
        this.selectedIndex = index;
        this._updateTitlePosition(index);
    }

    /**
     * @internal
     */
    public _$handleAdd() {
        this.add.emit();
    }

    /**
     * @internal
     */
    public _$handleRemove(index) {
        this.remove.emit(index);
    }

    /**
     * @internal
     */
    public _$listOptionClick(index) {
        if (this.data[index].disabled) return;
        this.selectedIndex = index;
    }

    protected get tabsInkBar(): ElementRef {
        return this._tabsInkBar;
    }

    protected get tabsNavWrap(): ElementRef {
        return this._tabsNavWrap;
    }

    protected get tabsNav(): ElementRef {
        return this._tabsNav;
    }

    protected get tabLabels(): QueryList<JigsawTabLabel> {
        return this._tabLabels;
    }
}

/**
 * 使用`JigsawTab`来将一组视图叠加在同一个区域使用，并以页签的方式来切换这些视图。
 * `JigsawTab`提供了多个api用于动态创建、销毁、隐藏tab页，
 * 这些是利用`JigsawTab`实现复杂、交互密集的视图的有力工具。
 *
 * 如果需要动态增减的视图内容形式比较单一，也可以通过`ng-for`来实现tab动态化。
 *
 * [组件Demo](/#/components/tab)
 */
@WingsTheme('tab.scss')
@Component({
    selector: 'jigsaw-tab, j-tab, jigsaw-tabs, j-tabs',
    templateUrl: 'tab.html',
    host: {
        '[class.jigsaw-tabs-host]': 'true',
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTab extends JigsawTabBase {

    constructor(private _cfr: ComponentFactoryResolver,
                protected _changeDetector: ChangeDetectorRef,
                private _viewContainer: ViewContainerRef,
                protected _elementRef: ElementRef,
                // @RequireMarkForCheck 需要用到，勿删
                protected _injector: Injector) {
        super(_changeDetector, _elementRef, _injector);
    }

    /**
     * @internal
     */
    @ContentChildren(JigsawTabPane)
    public _$tabPanes: QueryList<JigsawTabPane>;

    /**
     * @internal
     */
    @ViewChildren(JigsawTabContent)
    public _tabContents: QueryList<JigsawTabContent>;

    @ViewChild('tabBar')
    private _tabBar: JigsawTabBar;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public enableAnimation: boolean = true;

    /**
     * @internal
     */
    public _$handleAdd() {
        this.add.emit(this);
    }

    /**
     * @internal
     */
    public _$handleRemove(index) {
        this.removeTab(index);
        this.remove.emit(index);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    /**
     * 隐藏对应的Tab页，使用户在界面上看不到它，页无法对它做操作。
     * 注意这个方法不会销毁tab页内的组件，如果需要销毁tab页，请使用`removeTab`。
     * 被隐藏的tab页可以通过`showTab`方法让他们再次显示出来。
     *
     * $demo = tab/api
     * $demo = tab/hide-tab
     *
     * @param index tab页的编号，从0开始
     */
    public hideTab(index: number): void {
        let tabPane = this._getTabPaneByIndex(index);

        if (!this._isTabPane(tabPane)) return;

        tabPane.hidden = true;

        this._handleSelect();
    }

    /**
     * 将对应的Tab页切换为激活状态，当指定的tab页是隐藏状态时，它将被设置为正常状态并被激活。
     *
     * $demo = tab/api
     * $demo = tab/show-tab
     *
     * @param index tab页的编号，从0开始
     */
    public showTab(index: number) {
        let tabPane = this._getTabPaneByIndex(index);

        if (!this._isTabPane(tabPane)) return;

        tabPane.hidden = false;
        this.selectedIndex = index;
    }

    private _isTabPane(tabPane: any): boolean {
        if (!tabPane) {
            console.info("no tab-pane found...");
            return false;
        } else {
            return true;
        }
    }

    /**
     * 通过编程的方式添加一个新的tab页
     *
     * $demo = tab/api
     *
     * @param titleString 以一个简单的字符串作为标题
     * @param contentTemplate 以一个`ng-template`标签包围起来的模板作为tab页的内容，
     * 当tab页的内容比较简单时，建议采用此方式。
     * @param initData 提供给`contentTemplate`的初始化数据
     * @param activateImmediately 是否立即激活新增的Tab页，默认值是`true`
     */
    public addTab(titleString: string, contentTemplate: TemplateRef<any>,
                  initData?: Object, activateImmediately?: boolean);
    /**
     * @param titleTemplate 以一个`ng-template`标签包围起来的模板作为标题，
     * 这样可以彻底定制化新增的tab的标题部分，例如加图标，甚至添加按钮、进度条等复杂视图。
     * @param contentTemplate
     * @param initData
     * @param activateImmediately
     */
    public addTab(titleTemplate: TemplateRef<any>, contentTemplate: TemplateRef<any>,
                  initData?: Object, activateImmediately?: boolean);
    /**
     * @param titleComponent 以一个组件作为标题，这样可以彻底定制化新增的tab的标题部分，
     * 例如加图标，甚至添加按钮、进度条等复杂视图。
     * @param contentTemplate
     * @param initData
     * @param activateImmediately
     */
    public addTab(titleComponent: Type<IJigsawTabTitleRenderer>, contentTemplate: TemplateRef<any>,
                  initData?: Object, activateImmediately?: boolean);
    /**
     * @param titleString
     * @param contentComponent 以一个组件作为tab页的内容，
     * 如果新增的tab页内容比较复杂，建议采用此方式添加，以让各部分代码的耦合解开。
     * @param initData
     * @param activateImmediately
     */
    public addTab(titleString: string, contentComponent: Type<IDynamicInstantiatable>,
                  initData?: Object, activateImmediately?: boolean);
    /**
     * @param titleTemplate
     * @param contentComponent
     * @param initData
     * @param activateImmediately
     */
    public addTab(titleTemplate: TemplateRef<any>, contentComponent: Type<IDynamicInstantiatable>,
                  initData?: Object, activateImmediately?: boolean);
    /**
     * @param titleComponent
     * @param contentComponent
     * @param initData
     * @param activateImmediately
     */
    public addTab(titleComponent: Type<IJigsawTabTitleRenderer>, contentComponent: Type<IDynamicInstantiatable>,
                  initData?: Object, activateImmediately?: boolean);
    /**
     * @internal
     */
    public addTab(title: string | TemplateRef<any> | Type<IJigsawTabTitleRenderer>,
                  content: TemplateRef<any> | Type<IDynamicInstantiatable>,
                  initData?: Object, activateImmediately: boolean = true) {
        const factory = this._cfr.resolveComponentFactory(JigsawTabPane);
        let tabPane: JigsawTabPane = this._viewContainer.createComponent(factory).instance;
        if (typeof title == 'string') {
            tabPane.title = title
        } else {
            tabPane.label = title;
        }
        tabPane.content = content;
        tabPane.initData = initData;

        let tabTemp = this._$tabPanes.toArray();
        tabTemp.push(tabPane);
        this._$tabPanes.reset(tabTemp);
        this.length = this._$tabPanes.length;
        if (activateImmediately) {
            this.selectedIndex = this._$tabPanes.length - 1;
        }

        //router link
        this.runMicrotask(() => {
            const label = this.tabLabels.find(item => item.key === this.selectedIndex);
            if (!label) {
                return;
            }
            const link = label.elementRef.nativeElement.querySelector('[routerLink]');
            if (!link) {
                return;
            }
            link.click();
        });
    }

    /**
     * 销毁指定的Tab页，注意此操作不可恢复，可以使用`hideTab`来隐藏一个tab页，而非销毁它。
     *
     * $demo = tab/destroy-tab
     * $demo = tab/api
     *
     * @param index 目标tab页的编号，从0开始计数。
     */
    public removeTab(index: number): void {
        if (this._$tabPanes.length - index < 1) {
            console.info("没有对应tab-pane 供删除");
            return;
        }

        let tabTemp = this._$tabPanes.toArray();
        tabTemp.splice(index, 1); // 去掉要删除的元素;

        // 重新修改queryList. 不确定这么做有没有什么隐患.
        this._$tabPanes.reset(tabTemp);
        this._changeDetector.markForCheck();
        this.length = this._$tabPanes.length;
        if (this.selectedIndex == index) {
            this._handleSelect()
        } else if (this.selectedIndex > index) {
            this.selectedIndex = this.selectedIndex - 1
        }
    }

    public getTabPaneByIndex(index: number): JigsawTabPane {
        return this._$tabPanes?.find((_, idx) => idx == index);
    }

    public renameTab(index: number, newTitle: string): string;
    public renameTab(tabPane: JigsawTabPane, newTitle: string): string;
    public renameTab(indexOrPane: number | JigsawTabPane, newTitle: string): string {
        const tabPane: JigsawTabPane = indexOrPane instanceof JigsawTabPane ? indexOrPane :
            this.getTabPaneByIndex(indexOrPane);
        if (!tabPane) {
            console.error('no tab pane found by index or pane', indexOrPane);
            return '';
        }
        if (!!tabPane.titleRenderer) {
            console.warn('unable to modify the title of this tab pane, because it is using a title renderer');
            return;
        }
        const oldTitle = tabPane.title;
        tabPane.title = newTitle;
        return oldTitle;
    }

    /**
     * 当 没有指定选择哪个tab时自动处理选中的函数:
     * 使用场景:
     *  1. 隐藏了当前选中的tab-pane
     *  2. 删除了当前的tab-pane
     *  规则: 1. 最后一个非disabled的tabPane
     *        2. 否则隐藏tab 条.
     *
     */
    private _handleSelect() {
        let tabPane = this._getTabPaneByIndex(this.selectedIndex);

        if (!tabPane || tabPane.hidden || tabPane.disabled) {
            this._autoSelect()
        } else {
            this._asyncSetStyle(this.selectedIndex);
        }
    }

    protected get tabsInkBar(): ElementRef {
        return this._tabBar ? this._tabBar._tabsInkBar : this._tabsInkBar;
    }

    protected get tabsNavWrap(): ElementRef {
        return this._tabBar ? this._tabBar._tabsNavWrap : this._tabsNavWrap;
    }

    protected get tabsNav(): ElementRef {
        return this._tabBar ? this._tabBar._tabsNav : this._tabsNav;
    }

    protected get tabLabels(): QueryList<JigsawTabLabel> {
        return this._tabBar ? this._tabBar._tabLabels : this._tabLabels;
    }
}
