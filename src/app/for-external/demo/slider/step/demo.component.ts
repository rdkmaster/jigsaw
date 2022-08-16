import {Component} from "@angular/core";
import {SliderTextService} from "../doc.service";

@Component({
    selector: "slider-step",
    templateUrl: "./demo.component.html",
})

export class SliderStepDemoComponent {
    value3;
    valueStep = 1;
    public sliderChange3(value) {
        this.value3 = value;
    }
    constructor(public text: SliderTextService) {}

}
