import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "slider-set-min-max",
    templateUrl: "./demo.component.html"
})
export class SliderSetMinMaxDemoComponent extends AsyncDescription {
    public demoPath = "demo/slider/min-max";

    public value1: number = 10;
    public value2: number = 10;
    public value3: number = 10;
    public min = 4;
    public max = 20;
}
