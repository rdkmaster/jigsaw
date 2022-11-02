import { Component } from "@angular/core";
import { DemoSetBase } from "../../template/demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html"
})
export class TimeSectionDemoComponent extends DemoSetBase {
    public demoPath = "demo/time-section";
    public docPath = ['component/JigsawTimeSection'];
}
