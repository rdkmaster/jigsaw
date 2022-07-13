import {Component} from "@angular/core";
import {TimePickerTextService} from "../text.service";

@Component({
    selector: 'basic-time-picker',
    templateUrl: './demo.component.html'
})
export class TimePickerBasicDemoComponent {
    time;

    valueChange($event) {
        console.log('time change to ', $event);
    }
    constructor(public text: TimePickerTextService) {
    }
}
