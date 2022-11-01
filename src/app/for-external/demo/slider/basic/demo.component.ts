import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "slider-basic",
    templateUrl: "./demo.component.html",
})
export class SliderBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/slider/basic";

    public value: number = 70;
    public value1: number = 30;
    public disabled: boolean = false;

    public sliderChange(value) {
        console.log(value)
    }
}
