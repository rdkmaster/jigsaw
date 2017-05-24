import {
    Component, ContentChildren, QueryList, Input, ViewChildren, AfterViewInit, Output, EventEmitter, TemplateRef,
    ViewContainerRef, ComponentFactoryResolver
} from '@angular/core';
import {RdkPane} from "./tab-pane";
import {RdkTabLabel} from "./tab-label";
import {RdkTabContent} from "./tab-content";
import {AbstractRDKComponent} from "../core";

@Component({
    selector: 'rdk-tab',
    templateUrl: 'tab.html',
    styleUrls: ['./tab.scss']
})
export class RdkTab extends AbstractRDKComponent implements AfterViewInit {

    constructor(private _cfr: ComponentFactoryResolver, private _viewContainer: ViewContainerRef) {
        super()
    }

    @ContentChildren(RdkPane)
    private _tabPanes: QueryList<RdkPane>;

    @ViewChildren(RdkTabLabel)
    private _tabLabel: QueryList<RdkTabLabel>;

    @ViewChildren(RdkTabContent)
    private _tabContent: QueryList<RdkTabContent>;

    @Output()
    public selectChange = new EventEmitter<RdkPane>();

    public length: number;

    // tab页点击
    public _$tabClick(index) {
        this.selectedIndex = index;
    }

    private _selectedIndex: number;

    @Input()
    public get selectedIndex(): number {
        return this._selectedIndex;
    }

    public set selectedIndex(value: number) {
        if (this._selectedIndex !== value && typeof value == 'number') {
            this._selectedIndex = value;

            if (this.initialized) {
                this._handleSelectChange(value)
            }
        }
    }

    @Output()
    public selectedIndexChanged = new EventEmitter<number>();

    private _handleSelectChange(index) {
        this.selectChange.emit(this._getTabPaneByIndex(index));
        this.selectedIndexChanged.emit(index);

        this._asyncSetStyle(index);
    }

    private _inkBarStyle: object = {};

    private _setInkBarStyle(index: number) {
        let labelPos = this._getLabelOffsetByKey(index);

        this._inkBarStyle = {
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

    private _getTabPaneByIndex(key): RdkPane {
        return this._tabPanes.find((item, index) => index === key);
    }

    private _autoSelect() {
        this.selectedIndex = this._tabPanes.toArray().findIndex(tabPane => !tabPane.disabled && !tabPane.hidden);
    }

    private _asyncSetStyle(index: number): void {
        setTimeout(() => {
            this._setInkBarStyle(index);
        }, 0)
    }

    ngAfterViewInit() {
        if (this.selectedIndex != null) {
            this._handleSelectChange(this.selectedIndex)
        } else {
            this._autoSelect();
        }

        this.length = this._tabPanes.length;
    }

    /**
     * 隐藏对应的Tab页.
     * @param key (tab pane 的顺序.)
     */
    public hideTab(index): void {
        let tabPane = this._getTabPaneByIndex(index);

        if (!this._isTabPane(tabPane)) return;

        tabPane.hidden = true;

        this._handleSelect();
    }

    /**
     * 显示对应的Tab页, 如果已经是显示的没有变化, 隐藏的显示, 没有打印出警告.
     * @param index
     */
    public showTab(index) {
        let tabPane = this._getTabPaneByIndex(index);

        if (!this._isTabPane(tabPane)) return;

        tabPane.hidden = false;
        this.selectedIndex = index;
    }

    private _isTabPane(tabPane: any): boolean {
        if (!tabPane) {
            console.info("没有找到对应的索引的tab-pane");
            return false;
        } else {
            return true;
        }
    }

    /**
     * 添加tab页
     * @param tabPane
     */
    public addTab(title: string | TemplateRef<any>, content: TemplateRef<any>, initData: Object) {
        const factory = this._cfr.resolveComponentFactory(RdkPane);
        let tabPane: RdkPane = this._viewContainer.createComponent(factory).instance;
        if(typeof title == 'string'){
            tabPane.title = title
        }else{
            tabPane.label = title;
        }
        tabPane.content = content;
        tabPane.initData = initData;

        let tabTemp = this._tabPanes.toArray();
        tabTemp.push(tabPane);
        this._tabPanes.reset(tabTemp);
        this.length = this._tabPanes.length;
        this.selectedIndex = this._tabPanes.length - 1;

        //router link
        setTimeout(() => {
            let link = this._tabLabel.find(item => item.key === this.selectedIndex)
                .elementRef.nativeElement.querySelector('a');
            if (link) {
                link.click()
            }
        }, 0)

    }


    /**
     * 销毁指定的Tab页. 从0开始计数.
     * @param index
     */
    public removeTab(index) {
        if (this._tabPanes.length - index < 1) {
            console.info("没有对应tab-pane 供删除");
            return;
        }

        let tabTemp = this._tabPanes.toArray();
        tabTemp.splice(index, 1); // 去掉要删除的元素;

        // 重新修改queryList. 不确定这么做有没有什么隐患.
        this._tabPanes.reset(tabTemp);
        this.length = this._tabPanes.length;

        this._handleSelect();
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
