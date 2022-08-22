import { Component } from "@angular/core";
import { SliderTextService } from "../doc.service";

@Component({
    selector: "slider-set-min-max",
    templateUrl: "./demo.component.html"
})

export class SliderSetMinMaxDemoComponent {
    value1: number = 10;
    value2: number = 10;
    value3: number = 10;
    min = 4;
    max = 20;

    constructor(public doc: SliderTextService) { }

}
