import {Component} from "@angular/core";
import {TimePickerTextService} from "../doc.service";

@Component({
    selector: 'time-picker-basic',
    templateUrl: './demo.component.html'
})
export class TimePickerBasicDemoComponent {
    time;
    valueChange($event) {
    }
    constructor(public text: TimePickerTextService) {
    }
}
