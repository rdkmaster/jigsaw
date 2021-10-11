import {Component} from '@angular/core';
import {JigsawEditableTabTitleRenderer, TabTitleInfo} from "jigsaw/public_api";

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

    titleChanged(titleInfo: TabTitleInfo) {
        console.log("New title info: ", titleInfo);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
