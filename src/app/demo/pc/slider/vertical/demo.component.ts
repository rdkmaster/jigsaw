import {Component} from "@angular/core";
import {SliderTextService} from "../text.service";
import { ArrayCollection } from "jigsaw/public_api";
import {SliderMark} from "../../../../../jigsaw/pc-components/slider";

@Component({
    selector: "vertical-slider",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css", "./demo.component.css"]
})

export class SliderVerticalComponent {
    value = 10;
    vertical = true;
    rangeValue = new ArrayCollection([10, 80]);
    marks: SliderMark[] = [
        {value: 20, label: '20 ℃'},
        {value: 40, label: '40 ℃'},
        {value: 80, label: '80 ℃'}
    ];
    constructor(public text: SliderTextService) {}

}
