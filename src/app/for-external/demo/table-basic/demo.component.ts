import { Component } from "@angular/core";
import { DemoSetBase } from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class TableBasicAllComponent extends DemoSetBase {
    public demoPath = "demo/table-basic";
    public docPath = ['component/JigsawTable'];
}

