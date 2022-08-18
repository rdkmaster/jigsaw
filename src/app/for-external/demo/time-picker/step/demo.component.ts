import { Component } from "@angular/core";
import { TimePickerTextService } from "../doc.service";

@Component({
    selector: 'time-picker-step',
    templateUrl: './demo.component.html'
})
export class TimePickerStepDemoComponent {
    time;
    step = [5];
    valueChange($event) {
    }
    constructor(public text: TimePickerTextService) {
    }
}
