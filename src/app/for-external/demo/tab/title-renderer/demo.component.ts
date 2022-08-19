import {Component} from '@angular/core';
import {JigsawEditableTabTitleRenderer, TabTitleInfo} from "jigsaw/public_api";
import {TabTextService} from "../doc.service";

@Component({
    selector: 'tab-title-renderer',
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
    constructor(public doc: TabTextService) {
    }
}
