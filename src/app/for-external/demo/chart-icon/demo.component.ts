import { Component } from "@angular/core";
import { DemoSetBase } from "../../template/demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html"
})
export class ChartIconDemoComponent extends DemoSetBase {
    public demoPath = "demo/chart-icon";
    public docPath = ['component/JigsawBarChartIcon'];
}
