import { Component } from "@angular/core";
import { TimePickerTextService } from "../doc.service";

@Component({
    selector: 'time-picker-gr',
    templateUrl: './demo.component.html'
})
export class TimePickerGrDemoComponent {
    public time;
    public gr = ['time', 'time_hour_minute', 'time_minute_second', 'time_hour'];

    public valueChange($event) {
        console.log($event)
    }

    constructor(public doc: TimePickerTextService) {
    }
}
