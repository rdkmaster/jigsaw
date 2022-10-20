import { Component } from "@angular/core";
import { DemoSetBase } from "../../demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html"
})
export class TooltipDemoComponent extends DemoSetBase {
    public demoPath = "demo/tooltip";
    public docPath = ['directive/JigsawTooltip'];
}
