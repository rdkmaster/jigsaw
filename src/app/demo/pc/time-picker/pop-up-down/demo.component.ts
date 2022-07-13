import {Component} from "@angular/core";
import {TimePickerTextService} from "../text.service";

@Component({
    selector: 'pop-up-down-time-picker',
    templateUrl: './demo.component.html'
})
export class TimePickerFloatPositionDemoComponent {
    popDirection = ['up'];

    valueChange($event) {
        console.log('time change to ', $event);
    }

    constructor(public text: TimePickerTextService) {
    }
}
