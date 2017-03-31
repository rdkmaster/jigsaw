/**
 * Created by 10177553 on 2017/3/29.
 */
import {
    Component, OnInit, ContentChildren, QueryList, Directive, Input, ElementRef, ViewChildren,
    AfterViewInit, Output, EventEmitter, Type, TemplateRef
} from '@angular/core';
import {TabPane} from "./tab-pane";
import {TabLabel} from "./tab-label";
import {addExportToModule} from "@angular/cli/lib/ast-tools";
import {TabContent} from "./tab-content";

@Component({
    selector: 'rdk-tabs',
    templateUrl: 'tabs.html',
    styleUrls: ['./tabs.scss']
})
export class RdkTabs implements AfterViewInit {

    @ContentChildren(TabPane) _tabPanes: QueryList<TabPane>;

    // 声明不可修改的暴露属性.所有包含 TabPane
    public readonly tabs:QueryList<TabPane> = this._tabPanes;

    @ViewChildren(TabLabel) _tabLabel: QueryList<TabLabel>;

    @ViewChildren(TabContent) _tabContent: QueryList<TabContent>;

    @Output()
    public selectChange = new EventEmitter<TabPane>();

    // tab页点击
    private _tabClick(index) {
        if(this.selectedIndex === index) return;

        // 设置当前的selectedIndex
        this._setSelectIndex(index);

        // 发出事件, 返回相应
        this.selectChange.emit(this._getTabPaneByIndex(index));
    }

    public selectedIndex: number = 0;

    private _setSelectIndex(index):void {
        this.selectedIndex = index;

        this._setInkBarStyle(index);
    }

    _inkBarStyle: {}

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
        // todo 非法key的校验
        let currentLabel = this._tabLabel.find(item => item.key === key);

        // 非法的 key // 有可能getTop 等扩展Tab页时再重构.
        return {
            offSet: currentLabel.getOffsetLeft(),
            width: currentLabel.getOffsetWidth()
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
        // 默认选中的值.
        this._setSelectIndex(0);
    }

    // Todo 调用接口创建tabPane 1. templateRef 哪里来? 2. 是否默认显示创建的tabPane.
    addTabPane(title:string, content:TemplateRef<any>|Type<any>, icon?: string, index?: number) {

    }

    /**
     * 异常对应的Tab页.
     * @param key (tab pane 的顺序.)
     */
    hideTab(index):void {
        let tabPane = this._getTabPaneByIndex(index);
        tabPane.hidden = true;
    }

    /**
     * 显示对应的Tab页, 如果已经是显示的没有变化, 隐藏的显示, 没有打印出警告.
     * @param index
     */
    showTab(index) {
        let tabPane = this._getTabPaneByIndex(index);
        tabPane.hidden = false;
    }

    /**
     * 销毁指定的Tab页.
     * @param index
     */
    destroyTab(index) {

    }

}
