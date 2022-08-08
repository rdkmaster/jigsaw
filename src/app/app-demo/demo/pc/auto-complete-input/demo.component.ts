import { Component } from "@angular/core";
import { AutoCompleteInputTextService } from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class AutoCompleteInputDemoComponent {
    constructor(public text: AutoCompleteInputTextService) { }
}

