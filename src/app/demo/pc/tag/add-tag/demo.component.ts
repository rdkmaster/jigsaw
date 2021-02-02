import { Component, QueryList, ViewChildren } from "@angular/core";
import { JigsawTag } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.scss"]
})
export class TagAddDemoComponent {

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '添加isAdd="true"来设置新增tag';
    description: string = "";
}
