import {Component} from "@angular/core";
import {TimePickerTextService} from "../text.service";

@Component({
    selector: 'limit-time-picker',
    templateUrl: './demo.component.html'
})
export class TimePickerLimitDemoComponent {
    time;

    limitStart = '08:30:00';

    limitEnd = '17:40:00';

    valueChange($event) {
        console.log('time change to ', $event);
    }

    constructor(public text: TimePickerTextService) {
    }
}
