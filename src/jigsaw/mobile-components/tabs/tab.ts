import {
    Component,
    ContentChildren,
    QueryList,
    Input,
    ViewChildren,
    AfterViewInit,
    Output,
    EventEmitter,
    TemplateRef,
    ViewContainerRef,
    ComponentFactoryResolver,
    Type,
    ChangeDetectorRef,
    AfterViewChecked,
    ViewChild,
    ElementRef,
    EmbeddedViewRef,
    HostListener
} from '@angular/core';
import {JigsawMobileTabPane} from "./tab-pane";
import {JigsawMobileTabContent, JigsawMobileTabLabel, TabTitleInfo} from "./tab-item";
import {AbstractJigsawComponent, IDynamicInstantiatable} from "../../common/common";
import {PopupService, PopupSize, PopupInfo, PopupPositionValue} from "../../common/service/popup.service";
import {Subscription} from "rxjs/Subscription";

/**
 * 使用`JigsawTab`来将一组视图叠加在同一个区域使用，并以页签的方式来切换这些视图。
 * `JigsawTab`提供了多个api用于动态创建、销毁、隐藏tab页，
 * 这些是利用`JigsawTab`实现复杂、交互密集的视图的有力工具。
 *
 * 如果需要动态增减的视图内容形式比较单一，也可以通过`ng-for`来实现tab动态化，
 * 参考[这个demo]($demo=tab/with-ngfor)。
 *
 * $demo = tab/basic
 * $demo = tab/update-title
 * $demo = tab/with-input
 */
@Component({
    selector: 'jigsaw-mobile-tab, jm-tab, jigsaw-mobile-tabs, jm-tabs',
    templateUrl: 'tab.html',
    host: {
        '[class.jigsaw-tabs-host]': 'true',
        '[style.width]': 'width',
        '[style.height]': 'height'
    }
})
export class JigsawMobileTab extends AbstractJigsawComponent implements AfterViewInit, AfterViewChecked {

    constructor(private _cfr: ComponentFactoryResolver,
                private _changeDetector: ChangeDetectorRef,
                private _viewContainer: ViewContainerRef,
                private _elementRef: ElementRef,
                private _popupService: PopupService) {
        super();
    }

    /**
     * @internal
     */
    @ContentChildren(JigsawMobileTabPane)
    public _$tabPanes: QueryList<JigsawMobileTabPane>;

    @ViewChildren(JigsawMobileTabLabel)
    private _tabLabels: QueryList<JigsawMobileTabLabel>;

    /**
     * @internal
     */
    @ViewChildren(JigsawMobileTabContent)
    public _tabContents: QueryList<JigsawMobileTabContent>;

    /**
     * 当所选的tab页发生变化时发出此事件，事件携带的是被选中的tab页实例，
     * 如果需要索引值，请使用`selectedIndexChange`事件。
     *
     * @type {EventEmitter<JigsawTabPane>}
     */
    @Output()
    public selectChange = new EventEmitter<JigsawMobileTabPane>();

    /**
     * 删除tab时，发出事件，携带删除的tab索引值
     *
     * $demo = tab/editable
     *
     * @type {EventEmitter<number>}
     */
    @Output()
    public remove = new EventEmitter<number>();

    /**
     * 发送add事件，携带tabs的实例
     *
     * $demo = tab/editable
     *
     * @type {EventEmitter<JigsawTab>}
     */
    @Output()
    public add = new EventEmitter<JigsawMobileTab>();

    /**
     * 改变tab标题时发送此事件，事件携带一个`TabTitleInfo`类型的数据。
     *
     * @type {EventEmitter<TabTitleInfo>}
     */
    @Output()
    public titleChange = new EventEmitter<TabTitleInfo>();

    @ViewChild('tabsInkBar')
    private _tabsInkBar: ElementRef;

    /**
     * 控制tab显示添加和删除按钮
     *
     * $demo = tab/editable
     *
     * @type {boolean}
     */
    @Input()
    public editable: boolean;

    public _$headless: boolean = false;

    /**
     * 控制tab头部是否显示
     *
     * $demo = tab/headless
     *
     * @type {boolean}
     */

    @Input()
    public get headless(): boolean {
        return this._$headless;
    }

    public set headless(value: boolean) {
        if (this._$headless == value) {
            return;
        }
        this._$headless = value;
        this._calulateContentHeight();
    }

    @Input()
    public enableAnimation: boolean = true;

    /**
     * 当前的tab页数量，包含被隐藏的tab页
     */
    public length: number;

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
    public _$selectedIndex: number;

    /**
     * 当前选中的tab页编号，在双绑模式下，改变这个值可以实现选中tab页的切换。
     * @returns {number}
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
     * 当前选中的tab页编号发生变化时，发出此事件。
     * 事件携带的是索引值，如果需要获取更多信息，请参考`selectChange`事件。
     *
     * @type {EventEmitter<number>}
     */
    @Output()
    public selectedIndexChange = new EventEmitter<number>();

    private _handleSelectChange(index) {
        this.selectChange.emit(this._getTabPaneByIndex(index));
        this.selectedIndexChange.emit(index);

        this._asyncSetStyle(index);
    }

    /**
     * @internal
     */
    public _$inkBarStyle: object = {};

    private _setInkBarStyle(index: number) {
        if (!this._tabsInkBar || this._tabLabels.length == 0) return;

        let labelPos = this._getLabelOffsetByKey(index);
        if (!labelPos) {
            return;
        }

        this._$inkBarStyle = {
            'display': 'block',
            'transform': 'translate3d(' + (labelPos.offSet + this._tabLeftMap.get(this.selectedIndex)) + 'px, 0px, 0px)',
            'width': labelPos.width + 'px'
        }
    }

    // 将有纵向切换的封装.
    private _getLabelOffsetByKey(key: number): any {
        let currentLabel = this._tabLabels.find(item => item.key === key);

        if (currentLabel) {
            return {
                offSet: currentLabel.getOffsetLeft(),
                width: currentLabel.getOffsetWidth()
            }
        } else {
            return null;
        }
    }

    private _getTabPaneByIndex(key): JigsawMobileTabPane {
        return this._$tabPanes.find((item, index) => index === key);
    }

    private _autoSelect() {
        this.selectedIndex = this._$tabPanes.toArray().findIndex(tabPane => !tabPane.disabled && !tabPane.hidden);
    }

    private _asyncSetStyle(index: number): void {
        this.callLater(() => this._setInkBarStyle(index));
    }

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

    /**
     * @internal
     */
    public _$contentHeight: string = 'auto';

    ngOnInit() {
        super.ngOnInit();
        this._calulateContentHeight();
    }

    private _calulateContentHeight() {
        if (this.height) {
            this.callLater(() => {
                // 等待dom渲染
                this._$contentHeight = this._$headless ? this._elementRef.nativeElement.offsetHeight + 'px' : this._elementRef.nativeElement.offsetHeight - 46 + 'px';
            })
        }
    }

    private _tabLabelsChangeHandler: Subscription;

    ngAfterViewInit() {
        this._createTabList();
        this._tabLabelsChangeHandler = this._tabLabels.changes.subscribe(() => this._createTabList());
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
        if (!this._tabsInkBar || this._tabLabels.length == 0) return;
        this._createTabList();
        const labelPos = this._getLabelOffsetByKey(this.selectedIndex);
        if (!labelPos) {
            return;
        }

        const tabElem = this._tabsInkBar.nativeElement;
        if (tabElem.offsetWidth != labelPos.width) {
            this._asyncSetStyle(this.selectedIndex);
        } else {
            const match = (tabElem.style.transform + '').match(/\btranslate3d\s*\((\d+)px\s*,/);
            const offset = match ? match[1] : -1;
            if (offset != labelPos.offSet + this._tabLeftMap.get(this.selectedIndex)) {
                this._asyncSetStyle(this.selectedIndex);
            }
        }
    }

    /**
     * 隐藏对应的Tab页，使用户在界面上看不到它，页无法对它做操作。
     * 注意这个方法不会销毁tab页内的组件，如果需要销毁tab页，请使用`removeTab`。
     * 被隐藏的tab页可以通过`showTab`方法让他们再次显示出来。
     *
     * $demo = tab/api
     * $demo = tab/hide-tab
     *
     * @param {number} index tab页的编号，从0开始
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
     * @param {number} index tab页的编号，从0开始
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
     * @param {string} titleString 以一个简单的字符串作为标题
     * @param {TemplateRef<any>} contentTemplate 以一个`ng-template`标签包围起来的模板作为tab页的内容，
     * 当tab页的内容比较简单时，建议采用此方式。
     * @param {Object} initData 提供给`contentTemplate`的初始化数据
     * @param {boolean} activateImmediately 是否立即激活新增的Tab页，默认值是`true`
     */
    public addTab(titleString: string, contentTemplate: TemplateRef<any>,
                  initData?: Object, activateImmediately?: boolean);
    /**
     * @param {TemplateRef<any>} titleTemplate 以一个`ng-template`标签包围起来的模板作为标题，
     * 这样可以彻底定制化新增的tab的标题部分，例如加图标，甚至添加按钮、进度条等复杂视图。
     * @param {TemplateRef<any>} contentTemplate
     * @param {Object} initData
     * @param {boolean} activateImmediately
     */
    public addTab(titleTemplate: TemplateRef<any>, contentTemplate: TemplateRef<any>,
                  initData?: Object, activateImmediately?: boolean);
    /**
     * @param {Type<IDynamicInstantiatable>} titleComponent 以一个组件作为标题，这样可以彻底定制化新增的tab的标题部分，
     * 例如加图标，甚至添加按钮、进度条等复杂视图。
     * @param {TemplateRef<any>} contentTemplate
     * @param {Object} initData
     * @param {boolean} activateImmediately
     */
    public addTab(titleComponent: Type<IDynamicInstantiatable>, contentTemplate: TemplateRef<any>,
                  initData?: Object, activateImmediately?: boolean);
    /**
     * @param {string} titleString
     * @param {Type<IDynamicInstantiatable>} contentComponent 以一个组件作为tab页的内容，
     * 如果新增的tab页内容比较复杂，建议采用此方式添加，以让各部分代码的耦合解开。
     * @param {Object} initData
     * @param {boolean} activateImmediately
     */
    public addTab(titleString: string, contentComponent: Type<IDynamicInstantiatable>,
                  initData?: Object, activateImmediately?: boolean);
    /**
     * @param {TemplateRef<any>} titleTemplate
     * @param {Type<IDynamicInstantiatable>} contentComponent
     * @param {Object} initData
     * @param {boolean} activateImmediately
     */
    public addTab(titleTemplate: TemplateRef<any>, contentComponent: Type<IDynamicInstantiatable>,
                  initData?: Object, activateImmediately?: boolean);
    /**
     * @param {Type<IDynamicInstantiatable>} titleComponent
     * @param {Type<IDynamicInstantiatable>} contentComponent
     * @param {Object} initData
     * @param {boolean} activateImmediately
     */
    public addTab(titleComponent: Type<IDynamicInstantiatable>, contentComponent: Type<IDynamicInstantiatable>,
                  initData?: Object, activateImmediately?: boolean);
    /**
     * @internal
     */
    public addTab(title: string | TemplateRef<any> | Type<IDynamicInstantiatable>,
                  content: TemplateRef<any> | Type<IDynamicInstantiatable>,
                  initData?: Object, activateImmediately: boolean = true) {
        const factory = this._cfr.resolveComponentFactory(JigsawMobileTabPane);
        let tabPane: JigsawMobileTabPane = this._viewContainer.createComponent(factory).instance;
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
        this.callLater(() => {
            const label = this._tabLabels.find(item => item.key === this.selectedIndex);
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
    public removeTab(index) {
        if (this._$tabPanes.length - index < 1) {
            console.info("没有对应tab-pane 供删除");
            return;
        }

        let tabTemp = this._$tabPanes.toArray();
        tabTemp.splice(index, 1); // 去掉要删除的元素;

        // 重新修改queryList. 不确定这么做有没有什么隐患.
        this._$tabPanes.reset(tabTemp);
        this.length = this._$tabPanes.length;
        if (this.selectedIndex == index) {
            this._handleSelect()
        } else if (this.selectedIndex > index) {
            this.selectedIndex = this.selectedIndex - 1
        }
    }

    /**
     * 当 没有指定选择哪个tab时自动处理选中的函数:
     * 使用场景:
     *  1. 隐藏了当前选中的tab-pane
     *  2. 删除了当前的tab-pane
     *  规则: 1. 最后一个非disabled的tabPane
     *        2. 否则隐藏tab 条.
     * @private
     */
    private _handleSelect() {
        let tabPane = this._getTabPaneByIndex(this.selectedIndex);

        if (!tabPane || tabPane.hidden || tabPane.disabled) {
            this._autoSelect()
        } else {
            this._asyncSetStyle(this.selectedIndex);
        }
    }

    /**
     * @internal
     */
    public _$showOverflowButton: boolean = false;
    private _tabsListPopupInfo: PopupInfo;
    private _popupTimeout: any;

    /**
     * @internal
     */
    public _$popupTabList(tabsList, event, overflowButton) {
        this._$clearPopupTimeout();
        if (!this._tabsListPopupInfo) {
            let size = new PopupSize();
            size.width = 190;
            size.height = 150;
            this._tabsListPopupInfo = this._popupService.popup(tabsList, {
                modal: false,
                size: size,
                showBorder: false,
                pos: overflowButton,
                posOffset: { //偏移位置
                    top: overflowButton.offsetHeight,
                    right: overflowButton.offsetWidth
                },
                posReviser: (pos: PopupPositionValue, popupElement: HTMLElement): PopupPositionValue => {
                    return this._popupService.positionReviser(pos, popupElement, {
                        offsetHeight: overflowButton.offsetHeight,
                        direction: 'v'
                    });
                }
            });
        }
    }

    /**
     * @internal
     */
    public _$menuAreaLeave() {
        this._$clearPopupTimeout();
        this._popupTimeout = this.callLater(() => {
            if (this._tabsListPopupInfo) {
                this._tabsListPopupInfo.dispose();
                this._tabsListPopupInfo.element = null;
                this._tabsListPopupInfo = null;
            }
            this._popupTimeout = null;
        }, 400);
    }

    /**
     * @internal
     */
    public _$clearPopupTimeout() {
        if (this._popupTimeout) {
            this.clearCallLater(this._popupTimeout);
            this._popupTimeout = null;
        }
    }

    /**
     * @internal
     */
    public _$selectTabStyle:  object ={};

    /**
     * @internal
     */
    public _$listOptionClick(index) {
        if (this._$tabPanes.toArray()[index].disabled) return;
        this.selectedIndex = index;
    }


    /**
     * @internal
     */
    public _$tabList = [];

    private _tabLeftMap: Map<number, number> = new Map<number, number>();

    private _createTabList() {
        if (this._$headless || !this._tabsNavWrap) {
            return;
        }
        this._$tabList = [];
        this._tabLeftMap.clear();
        this._tabLabels.forEach((label: JigsawMobileTabLabel, index) => {
            let title = "";
            let rootNodes = (<EmbeddedViewRef<any>>label._tabItemRef).rootNodes;
            if(rootNodes) {
                for (let i = 0; i < rootNodes.length; i++) {
                    if (rootNodes[i] instanceof HTMLElement) {
                        title += " " + rootNodes[i].outerHTML;
                    } else {
                        title += " " + rootNodes[i].textContent.trim();
                    }
                }
            }
            this._$tabList.push(title.trim());
            let distance = label.getOffsetLeft() + label.getOffsetWidth() - this._tabsNavWrap.nativeElement.offsetWidth;
            this._tabLeftMap.set(index, distance > 0 ? (0 - distance) : 0);
        });
        this._updateOverflowButton();
        this._updateTitlePosition(this.selectedIndex);
    }

    private _updateTitlePosition(index) {
        this._$selectTabStyle = {
            "left": this._tabLeftMap.get(index) + "px"
        };
    }

    @ViewChild('tabsNavWrap')
    private _tabsNavWrap: ElementRef;

    @ViewChild('tabsNav')
    private _tabsNav: ElementRef;

    private _updateOverflowButton() {
        if(!this._tabsNav || !this._tabsNavWrap) return;
        this._$showOverflowButton = this._tabsNavWrap.nativeElement.offsetWidth < this._tabsNav.nativeElement.offsetWidth;
        this._changeDetector.detectChanges();
    }
    @HostListener('window:resize')
    onResize() {
        this._createTabList();
    }
}
