import {Component} from "@angular/core";
import {SliderTextService} from "../doc.service";

@Component({
    selector: "slider-set-min-max",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class SliderSetMinMaxDemoComponent {
    value: number = 10;
    min = 4;
    max = 20;

    sliderChange(value) {
        this.value = value;
    }
    constructor(public text: SliderTextService) {}

}
