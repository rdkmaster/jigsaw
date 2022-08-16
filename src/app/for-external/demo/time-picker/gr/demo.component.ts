import {Component} from "@angular/core";
import {TimePickerTextService} from "../doc.service";

@Component({
    selector: 'time-picker-gr',
    templateUrl: './demo.component.html'
})
export class TimePickerGrDemoComponent {
    time;

    gr = ['time', 'time_hour_minute','time_minute_second','time_hour'];

    valueChange($event) {
    }
    constructor(public text: TimePickerTextService) {
    }
}
