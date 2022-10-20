import { Component } from "@angular/core";
import { DemoSetBase } from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class ZtreeAllComponent extends DemoSetBase {
    public demoPath = "demo/tree";
    public docPath = ['component/JigsawTreeExt'];
}

