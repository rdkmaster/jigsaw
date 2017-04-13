import {
    Component, ContentChildren, QueryList, Input, ViewChildren,
    AfterViewInit, Output, EventEmitter, AfterViewChecked, ChangeDetectorRef
} from '@angular/core';
import {TabPane} from "./tab-pane";
import {TabLabel} from "./tab-label";
import {TabContent} from "./tab-content";

@Component({
    selector: 'rdk-tab',
    templateUrl: 'tab.html',
    styleUrls: ['./tab.scss']
})
export class RdkTab implements AfterViewInit, AfterViewChecked {

    @ContentChildren(TabPane) _tabPanes: QueryList<TabPane>;

    // 声明不可修改的暴露属性.所有包含 TabPane
    public tabPanes = this._tabPanes;

    @ViewChildren(TabLabel) _tabLabel: QueryList<TabLabel>;

    @ViewChildren(TabContent) _tabContent: QueryList<TabContent>;

    @Output()
    public selectChange = new EventEmitter<TabPane>();

    constructor(private _changeDetector: ChangeDetectorRef) {};

    // tab页点击
    private _tabClick(index) {
        if(this.selectedIndex === index) return;

        // 设置当前的selectedIndex
        this._setSelectIndex(index);

        // 发出事件, 返回相应
        this.selectChange.emit(this._getTabPaneByIndex(index));
        this.selectedIndexChanged.emit(index);
    }

    private _selectedIndex: number = 0;

    @Input()
    public get selectedIndex():number {
        return this._selectedIndex;
    }
    public set selectedIndex(value: number) {
        if(this._selectedIndex === value) return;

        this._selectedIndex = value;
    }

    @Output()
    public selectedIndexChanged = new EventEmitter<number>();

    private _setSelectIndex(index):void {
        this.selectedIndex = index;

        this._setInkBarStyle(index);
    }

    _inkBarStyle: {};

    private _setInkBarStyle(index: number) {
        let labelPos = this._getLabelOffsetByKey(index);

        this._inkBarStyle = {
            'display': 'block',
            'transform': 'translate3d('+ labelPos.offSet +'px, 0px, 0px)',
            'width': labelPos.width + 'px'
        }
    }

    // 将有纵向切换的封装.
    private _getLabelOffsetByKey(key: number): any {
        let currentLabel = this._tabLabel.find(item => item.key === key);

        // 非法的 key // 有可能getTop 等扩展Tab页时再重构.
        if(currentLabel) { // 找到对应的Label
            return {
                offSet: currentLabel.getOffsetLeft(),
                width: currentLabel.getOffsetWidth()
            }
        } else {
            console.warn("没有对应key的tab-Label");
            return {}
        }
    }

    private _getTabPaneByIndex(key):TabPane {
        return this._tabPanes.find((item,index) => index === key);
    }

    private _getTabLabelByIndex(key):TabLabel {
        return this._tabLabel.find((item,index) => index === key);
    }

    private _getTabContentByIndex(key):TabContent {
        return this._tabContent.find((item,index) => index === key);
    }

    ngAfterViewInit() {
        this._setSelectIndex(this.selectedIndex);
    }

    ngAfterViewChecked() {
        this._setSelectIndex(this.selectedIndex);
        // 因为已经做过"脏检查", 需要手动再触发检查
        this._changeDetector.detectChanges();

        this.tabPanes = this._tabPanes;
    }

    /**
     * 隐藏对应的Tab页.
     * @param key (tab pane 的顺序.)
     */
    public hideTabPane(index):void {
        let tabPane = this._getTabPaneByIndex(index);

        if(!this._isTabPane(tabPane)) return;

        tabPane.hidden = true;

        this._handleSelect();
    }
    /**
     * 显示对应的Tab页, 如果已经是显示的没有变化, 隐藏的显示, 没有打印出警告.
     * @param index
     */
    public showTabPane(index) {
        let tabPane = this._getTabPaneByIndex(index);

        if(!this._isTabPane(tabPane)) return;

        tabPane.hidden = false;
        this.selectedIndex = index;
    }

    private _isTabPane(tabPane: any):boolean {
        if(!tabPane) {
            console.info("没有找到对应的索引的tab-pane");
            return false;
        } else {
            return true;
        }
    }


    /**
     * 销毁指定的Tab页. 从0开始计数.
     * @param index
     */
    destroyTabPane(index) {
        if(this._tabPanes.length - index < 1) {
            console.info("没有对应tab-pane 供删除");
            return;
        }

        let tabTemp = this._tabPanes.toArray();
        tabTemp.splice(index, 1); // 去掉要删除的元素;

        // 重新修改queryList. 不确定这么做有没有什么隐患.
        this._tabPanes.reset(tabTemp);

        this._getTabLabelByIndex(index).destroy();
        this._getTabContentByIndex(index).destroy();

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

        if(!tabPane|| tabPane.hidden|| tabPane.disabled) {
            let canSelect = -1;

            this._tabPanes.forEach((item, index) => {
                if(!item.disabled&& !item.hidden) canSelect = index;
            });

            if(canSelect === -1) {
                // 1. Todo 没有非disable和hidden的tab页时，怎么显示tab页.
                console.info("取消显示");
            } else {
                this.selectedIndex = canSelect;
            }
        }
    }
}
