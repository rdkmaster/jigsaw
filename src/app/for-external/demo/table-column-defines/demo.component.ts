import { Component } from "@angular/core";
import { DemoSetBase } from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class TableColumnDefinesAllComponent extends DemoSetBase {
    public demoPath = "demo/table-column-defines";
    public docPath = ['component/JigsawTable'];
}

