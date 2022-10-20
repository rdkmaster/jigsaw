import { Component } from "@angular/core";
import {DemoSetBase} from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class StepsAllComponent extends DemoSetBase {
    public demoPath = "demo/steps";
    public docPath = ['component/JigsawSteps'];
}

