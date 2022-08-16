import {Component} from "@angular/core";
import {SliderTextService} from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: "slider-mark",
    templateUrl: "demo.component.html",
    styleUrls: ["../public.css"]
})

export class SliderMarkDemoComponent {
    marks = [
        {value: 20, label: '20 ℃'},
        {value: 40, label: '40 ℃'},
        {
            value: 60, label: '60 ℃', style: {color: "red"}
        }
    ];

    rangeValue = new ArrayCollection([30, 50, 60]);

    constructor(public text: SliderTextService) {}

}
