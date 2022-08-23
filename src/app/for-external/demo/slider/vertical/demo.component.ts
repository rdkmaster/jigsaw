import { Component } from "@angular/core";
import { SliderTextService } from "../doc.service";
import { SliderMark, ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: "slider-vertical",
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})

export class SliderVerticalDemoComponent {
    public value = 10;
    public vertical = true;
    public rangeValue = new ArrayCollection([10, 80]);
    public marks: SliderMark[] = [
        { value: 20, label: '20 ℃' },
        { value: 40, label: '40 ℃' },
        { value: 80, label: '80 ℃' }
    ];

    constructor(public doc: SliderTextService) { }
}
