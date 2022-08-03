import {Component} from "@angular/core";
import {TimePickerTextService} from "../doc.service";

@Component({
    selector: 'time-picker-limit',
    templateUrl: './demo.component.html'
})
export class TimePickerLimitDemoComponent {
    time;

    limitStart = '08:30:00';

    limitEnd = '17:40:00';

    valueChange($event) {
    }

    constructor(public text: TimePickerTextService) {
    }
}
