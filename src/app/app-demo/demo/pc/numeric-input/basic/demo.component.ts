import {Component} from "@angular/core";
import {NumericInputTextService} from "../doc.service";

@Component({
    selector: 'numeric-input-basic',
  templateUrl: './demo.component.html'
})
export class NumericInputBasicDemoComponent {
    public selectedLabel = {label: "中", size: "default"};
    value: number;

    valueChange($event) {
        console.log($event, typeof $event == 'number');
    }

    constructor(public text: NumericInputTextService) {
    }
}
