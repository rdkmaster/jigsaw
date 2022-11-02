import { Component } from "@angular/core";
import { DemoSetBase } from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class RibbonAllComponent extends DemoSetBase {
    public demoPath = "demo/ribbon";
    public docPath = ['directive/JigsawRibbonDirective'];
}

