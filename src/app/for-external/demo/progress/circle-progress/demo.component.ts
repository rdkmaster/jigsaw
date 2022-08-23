import { Component } from "@angular/core";
import { ProgressTextService } from "../doc.service";

@Component({
    selector: 'circle-progress',
    templateUrl: "./demo.component.html"
})
export class CircleProgressDemoComponent {
    constructor(public doc: ProgressTextService) {
    }
}
