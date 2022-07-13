import {Component} from "@angular/core";
import {TimePickerTextService} from "../text.service";

@Component({
    selector: 'gr-time-picker',
    templateUrl: './demo.component.html'
})
export class TimePickerGrDemoComponent {
    time;

    gr = ['time'];

    valueChange($event) {
        console.log('time change to ', $event);
    }

    constructor(public text: TimePickerTextService) {
    }
}
