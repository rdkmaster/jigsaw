import {Component} from '@angular/core';
import {JigsawEditableTabTitleRenderer, TabTitleInfo} from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class TabsTitleRendererComponent {
    selectedIndex = 0;
    editorTitleRenderer = JigsawEditableTabTitleRenderer;
    tabData = [
        {label: "Tab11"},
        {label: "自定义title", renderer: JigsawEditableTabTitleRenderer},
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
