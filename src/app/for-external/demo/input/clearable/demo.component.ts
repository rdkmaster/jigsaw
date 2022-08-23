import { Component } from "@angular/core";
import { InputTextService } from "../doc.service";

@Component({
    selector: 'input-clearable',
    templateUrl: './demo.component.html'
})
export class InputClearableDemoComponent {
    constructor(public doc: InputTextService) {
    }
}
