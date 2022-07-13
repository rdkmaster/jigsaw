import {Component} from "@angular/core";
import {TimePickerTextService} from "../text.service";

@Component({
    selector: 'step-time-picker',
    templateUrl: './demo.component.html'
})
export class TimePickerStepDemoComponent {
    time;
    step = [5];

    valueChange($event) {
        console.log('time change to ',$event);
    }

    constructor(public text: TimePickerTextService) {
    }
}
