import { Component } from "@angular/core";
import { DemoSetBase } from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class TableRendererAllComponent extends DemoSetBase {
    public demoPath = "demo/table-renderer";
    public docPath = ['component/JigsawTable'];
}

