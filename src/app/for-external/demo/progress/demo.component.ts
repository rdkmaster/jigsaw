import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html"
})
export class ProgressDemoComponent extends DemoSetBase {
    public demoPath = "demo/progress";
    public docPath = ['component/JigsawProgress'];
}
