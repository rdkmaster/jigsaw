import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "slider-step",
    templateUrl: "./demo.component.html",
})
export class SliderStepDemoComponent extends AsyncDescription {
    public demoPath = "demo/slider/step";

    public valueStep = 1;
}
