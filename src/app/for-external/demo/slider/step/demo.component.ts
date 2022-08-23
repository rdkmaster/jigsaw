import { Component } from "@angular/core";
import { SliderTextService } from "../doc.service";

@Component({
    selector: "slider-step",
    templateUrl: "./demo.component.html",
})

export class SliderStepDemoComponent {
    public valueStep = 1;

    constructor(public doc: SliderTextService) { }
}
