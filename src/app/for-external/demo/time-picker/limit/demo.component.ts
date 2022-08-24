import { Component } from "@angular/core";
import { TimePickerTextService } from "../doc.service";

@Component({
    selector: 'time-picker-limit',
    templateUrl: './demo.component.html'
})
export class TimePickerLimitDemoComponent {
    public time;

    public limitStart = '08:30:00';

    public limitEnd = '17:40:00';

    public valueChange($event) {
        console.log($event)
    }

    constructor(public doc: TimePickerTextService) {
    }
}
