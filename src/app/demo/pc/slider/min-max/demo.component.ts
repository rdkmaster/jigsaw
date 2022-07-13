import {Component} from "@angular/core";
import {SliderTextService} from "../text.service";

@Component({
    selector: "set-min-max-slider",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class SliderSetMinMaxComponent {
    value: number = 10;
    min = 1;
    max = 20;

    sliderChange(value) {
        this.value = value;
    }
    constructor(public text: SliderTextService) {}

}
