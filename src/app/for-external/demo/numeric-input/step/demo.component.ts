import {Component} from "@angular/core";
import {NumericInputTextService} from "../doc.service";

@Component({
    selector: 'numeric-input-step',
    templateUrl: './demo.component.html'
})
export class NumericInputStepDemoComponent {
    public selectedLabel = {label: "中", size: "default"};

    constructor(public doc: NumericInputTextService) {
    }
}
