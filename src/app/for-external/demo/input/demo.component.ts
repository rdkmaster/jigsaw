import { Component } from "@angular/core";
import {DemoSetBase} from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class InputAllComponent extends DemoSetBase {
    public demoPath = "demo/input";
    public docPath = ['component/JigsawInput'];
}

