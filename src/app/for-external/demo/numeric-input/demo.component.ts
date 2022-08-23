import { Component } from "@angular/core";
import { NumericInputTextService } from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class NumericInputAllComponent {
    constructor(public doc: NumericInputTextService) { }
}

