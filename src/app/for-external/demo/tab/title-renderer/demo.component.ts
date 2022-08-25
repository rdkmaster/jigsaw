import { Component } from '@angular/core';
import { JigsawEditableTabTitleRenderer, TabTitleInfo } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'tab-title-renderer',
    templateUrl: "./demo.component.html"
})
export class TabsTitleRendererComponent extends AsyncDescription {
    public demoPath = "demo/tab/title-renderer";

    public selectedIndex = 0;
    public titleEditorRenderer = JigsawEditableTabTitleRenderer;
    public tabData = [
        { label: "不可编辑" },
        { label: "标题可编辑的", renderer: JigsawEditableTabTitleRenderer },
        { renderer: JigsawEditableTabTitleRenderer }
    ];

    public titleChanged(titleInfo: TabTitleInfo) {
        console.log("New title info: ", titleInfo);
    }
}
