import { Component } from "@angular/core";
import { ProgressTextService } from "./doc.service";

@Component({
    templateUrl: "demo.component.html"
})
export class ProgressDemoComponent {
    constructor(public doc: ProgressTextService) {
    }
}
