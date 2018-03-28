import {
    Component, ContentChildren, QueryList, Input, ViewChildren, AfterViewInit, Output, EventEmitter, TemplateRef,
    ViewContainerRef, ComponentFactoryResolver, Type, ChangeDetectorRef, AfterViewChecked, ViewChild, ElementRef
} from '@angular/core';
import {JigsawTabPane} from "./tab-pane";
import {JigsawTabContent, JigsawTabLabel} from "./tab-item";
import {AbstractJigsawComponent, IDynamicInstantiatable} from "../common";

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
    selector: 'jigsaw-tab, j-tab, jigsaw-tabs, j-tabs',
    templateUrl: 'tab.html',
})
export class JigsawTab extends AbstractJigsawComponent implements AfterViewInit, AfterViewChecked {

    constructor(private _cfr: ComponentFactoryResolver,
                private _changeDetector: ChangeDetectorRef,
                private _viewContainer: ViewContainerRef) {
        super()
    }

    /**
     * @internal
     */
    @ContentChildren(JigsawTabPane)
    public _$tabPanes: QueryList<JigsawTabPane>;

    @ViewChildren(JigsawTabLabel)
    private _tabLabel: QueryList<JigsawTabLabel>;

    @ViewChildren(JigsawTabContent)
    private _tabContent: QueryList<JigsawTabContent>;

    /**
     * 当所选的tab页发生变化时发出此事件，事件携带的是被选中的tab页实例，
     * 如果需要索引值，请使用`selectedIndexChange`事件。
     *
     * @type {EventEmitter<JigsawTabPane>}
     */
    @Output()
    public selectChange = new EventEmitter<JigsawTabPane>();

    @ViewChild('tabsInkBar')
    private _tabsInkBar: ElementRef;

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
        let labelPos = this._getLabelOffsetByKey(index);

        this._$inkBarStyle = {
            'display': 'block',
            'transform': 'translate3d(' + labelPos.offSet + 'px, 0px, 0px)',
            'width': labelPos.width + 'px'
        }
    }

    // 将有纵向切换的封装.
    private _getLabelOffsetByKey(key: number): any {
        let currentLabel = this._tabLabel.find(item => item.key === key);

        // 非法的 key // 有可能getTop 等扩展Tab页时再重构.
        if (currentLabel) { // 找到对应的Label
            return {
                offSet: currentLabel.getOffsetLeft(),
                width: currentLabel.getOffsetWidth()
            }
        } else {
            console.warn("没有对应key的tab-Label");
            return {}
        }
    }

    private _getTabPaneByIndex(key): JigsawTabPane {
        return this._$tabPanes.find((item, index) => index === key);
    }

    private _autoSelect() {
        this.selectedIndex = this._$tabPanes.toArray().findIndex(tabPane => !tabPane.disabled && !tabPane.hidden);
    }

    private _asyncSetStyle(index: number): void {
        this.callLater(() => this._setInkBarStyle(index));
    }

    ngAfterViewInit() {
        if (this.selectedIndex != null) {
            this._handleSelectChange(this.selectedIndex)
        } else {
            this._autoSelect();
        }

        this.length = this._$tabPanes.length;
    }

    // 注意此方法会被频繁调用，性能要求高
    ngAfterViewChecked() {
        if(!this._tabsInkBar) return;

        const labelPos = this._getLabelOffsetByKey(this.selectedIndex);

        const tabElem = this._tabsInkBar.nativeElement;
        if (tabElem.offsetWidth != labelPos.width) {
            this._asyncSetStyle(this.selectedIndex);
        } else {
            const match = (tabElem.style.transform + '').match(/\btranslate3d\s*\((\d+)px\s*,/);
            const offset = match ? match[1] : -1;
            if (offset != labelPos.offSet) {
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
     */
    public addTab(titleString: string, contentTemplate: TemplateRef<any>, initData?: Object);
    /**
     * @param {TemplateRef<any>} titleTemplate 以一个`ng-template`标签包围起来的模板作为标题，
     * 这样可以彻底定制化新增的tab的标题部分，例如加图标，甚至添加按钮、进度条等复杂视图。
     * @param {TemplateRef<any>} contentTemplate
     * @param {Object} initData
     */
    public addTab(titleTemplate: TemplateRef<any>, contentTemplate: TemplateRef<any>, initData?: Object);
    /**
     * @param {Type<IDynamicInstantiatable>} titleComponent 以一个组件作为标题，这样可以彻底定制化新增的tab的标题部分，
     * 例如加图标，甚至添加按钮、进度条等复杂视图。
     * @param {TemplateRef<any>} contentTemplate
     * @param {Object} initData
     */
    public addTab(titleComponent: Type<IDynamicInstantiatable>, contentTemplate: TemplateRef<any>, initData?: Object);
    /**
     *
     * @param {string} titleString
     * @param {Type<IDynamicInstantiatable>} contentComponent 以一个组件作为tab页的内容，
     * 如果新增的tab页内容比较复杂，建议采用此方式添加，以让各部分代码的耦合解开。
     * @param {Object} initData
     */
    public addTab(titleString: string, contentComponent: Type<IDynamicInstantiatable>, initData?: Object);
    /**
     * @param {TemplateRef<any>} titleTemplate
     * @param {Type<IDynamicInstantiatable>} contentComponent
     * @param {Object} initData
     */
    public addTab(titleTemplate: TemplateRef<any>, contentComponent: Type<IDynamicInstantiatable>, initData?: Object);
    /**
     * @param {Type<IDynamicInstantiatable>} titleComponent
     * @param {Type<IDynamicInstantiatable>} contentComponent
     * @param {Object} initData
     */
    public addTab(titleComponent: Type<IDynamicInstantiatable>, contentComponent: Type<IDynamicInstantiatable>, initData?: Object);
    /**
     * @internal
     */
    public addTab(title: string | TemplateRef<any> | Type<IDynamicInstantiatable>,
                  content: TemplateRef<any> | Type<IDynamicInstantiatable>,
                  initData?: Object) {
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
        this.selectedIndex = this._$tabPanes.length - 1;

        //router link
        this.callLater(() => {
            let link = this._tabLabel.find(item => item.key === this.selectedIndex)
                .elementRef.nativeElement.querySelector('[routerLink]');
            if (link) {
                link.click()
            }
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
        } else {
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
}
