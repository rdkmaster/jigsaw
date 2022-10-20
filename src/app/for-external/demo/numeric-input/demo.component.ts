import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class NumericInputAllComponent extends DemoSetBase {
    public demoPath = "demo/numeric-input";
    public docPath = ['component/JigsawNumericInput'];
}

