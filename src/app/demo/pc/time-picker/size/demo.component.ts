import {Component} from "@angular/core";
import {TimePickerTextService} from "../text.service";

@Component({
    selector: 'size-time-picker',
    templateUrl: './demo.component.html'
})
export class TimePickerSizeDemoComponent {
    time;

    valueChange($event) {
        console.log('time change to ', $event);
    }

    constructor(public text: TimePickerTextService) {
    }
}
