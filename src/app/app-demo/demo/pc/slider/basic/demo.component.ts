import {Component} from "@angular/core";
import {SliderTextService} from "../doc.service";

@Component({
    selector: "slider-basic",
    templateUrl: "./demo.component.html",
})

export class SliderBasicDemoComponent {
    value: number = 70;
    value1: number = 30;
    disabled: boolean = false;
    disabled1: boolean = true;

    sliderChange(value) {
    }
    constructor(public text: SliderTextService) {}

}
