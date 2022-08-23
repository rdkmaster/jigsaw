import { Component } from "@angular/core";
import { SliderTextService } from "../doc.service";

@Component({
    selector: "slider-basic",
    templateUrl: "./demo.component.html",
})

export class SliderBasicDemoComponent {
    public value: number = 70;
    public value1: number = 30;
    public disabled: boolean = false;

    public sliderChange(value) {
        console.log(value)
    }

    constructor(public doc: SliderTextService) { }

}
