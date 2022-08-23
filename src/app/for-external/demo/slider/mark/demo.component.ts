import { Component } from "@angular/core";
import { SliderTextService } from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: "slider-mark",
    templateUrl: "demo.component.html"
})

export class SliderMarkDemoComponent {
    public marks = [
        { value: 20, label: '20 ℃' },
        { value: 40, label: '40 ℃' },
        {
            value: 60, label: '60 ℃', style: { color: "red" }
        }
    ];

    public rangeValue = new ArrayCollection([30, 50, 60]);

    constructor(public doc: SliderTextService) { }
}
