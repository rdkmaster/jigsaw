import {Component} from "@angular/core";
import {SliderTextService} from "../text.service";

@Component({
    selector: "change-step-slider",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class SliderChangeStepComponent {
    value;
    valueStep = 1;

    public sliderChange3(value) {
        this.value = value;
    }
    constructor(public text: SliderTextService) {}

}
