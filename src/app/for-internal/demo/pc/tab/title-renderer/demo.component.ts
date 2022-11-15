import {Component, ViewChild} from '@angular/core';
import {JigsawEditableTabTitleRenderer, JigsawTab, TabTitleInfo} from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class TabsTitleRendererComponent {
    selectedIndex = 0;
    titleEditorRenderer = JigsawEditableTabTitleRenderer;
    tabData = [
        {label: "不可编辑"},
        {label: "标题可编辑的", renderer: JigsawEditableTabTitleRenderer},
        {renderer: JigsawEditableTabTitleRenderer}
    ];

    @ViewChild('tabs')
    private _tabs: JigsawTab;

    public onclick() {
        const pane = this._tabs.getTabPaneByIndex(1);
        this._tabs.renameTab(pane, '这个标题修改应该不成功');
    }

    titleChanged(titleInfo: TabTitleInfo) {
        console.log("New title info: ", titleInfo);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
