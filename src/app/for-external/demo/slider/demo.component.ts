import { Component } from "@angular/core";
import { SliderTextService } from "./doc.service";

@Component({
    templateUrl: './demo.component.html'
})
export class SliderDemoComponent {
    constructor(public doc: SliderTextService) { }
}

