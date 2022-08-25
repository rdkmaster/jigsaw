import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "slider-multi-value",
    templateUrl: "./demo.component.html"
})
export class SliderMultiValueDemoComponent extends AsyncDescription {
    public demoPath = "demo/slider/multi-value";

    public rangeValue = new ArrayCollection([30, 50, 60]);

    public handleValueChange(value) {
        console.log("传递出来的对象:");
        console.log(value);
    }
}
