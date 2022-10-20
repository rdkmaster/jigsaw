import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "slider-mark",
    templateUrl: "demo.component.html"
})
export class SliderMarkDemoComponent extends AsyncDescription {
    public demoPath = "demo/slider/mark";

    public marks = [
        { value: 20, label: '20 ℃' },
        { value: 40, label: '40 ℃' },
        {
            value: 60, label: '60 ℃', style: { color: "red" }
        }
    ];

    public rangeValue = new ArrayCollection([30, 50, 60]);
}
