import { Component } from "@angular/core";
import { SliderTextService } from "../doc.service";

@Component({
    selector: "slider-set-min-max",
    templateUrl: "./demo.component.html"
})

export class SliderSetMinMaxDemoComponent {
    public value1: number = 10;
    public value2: number = 10;
    public value3: number = 10;
    public min = 4;
    public max = 20;

    constructor(public doc: SliderTextService) { }
}
