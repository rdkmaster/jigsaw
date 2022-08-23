import { Component } from "@angular/core";
import { StepsTextService } from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class StepsAllComponent {
    constructor(public doc: StepsTextService) { }
}

