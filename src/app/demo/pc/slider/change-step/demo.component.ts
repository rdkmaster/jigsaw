import {Component} from "@angular/core";
import {SliderTextService} from "../doc.service";

@Component({
    selector: "change-step-slider",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class SliderChangeStepDemoComponent {
    value;
    valueStep = 1;

    public sliderChange3(value) {
        this.value = value;
    }
    constructor(public text: SliderTextService) {}

}
