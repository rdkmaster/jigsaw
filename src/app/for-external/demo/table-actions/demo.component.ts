import { Component } from "@angular/core";
import { DemoSetBase } from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class TableActionsAllComponent extends DemoSetBase {
    public demoPath = "demo/table-actions";
    public docPath = ['component/JigsawTable'];
}

