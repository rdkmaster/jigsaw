import { Component } from "@angular/core";
import { TimeSectionTextService } from "./doc.service";

@Component({
    templateUrl: "demo.component.html"
})
export class TimeSectionDemoComponent {
    constructor(public doc: TimeSectionTextService) {
    }
}
