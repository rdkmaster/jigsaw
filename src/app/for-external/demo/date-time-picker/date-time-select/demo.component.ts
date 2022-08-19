import {Component} from "@angular/core";
import {DateTimePickerTextService} from "../doc.service";

@Component({
    selector: 'date-time-picker-date-time-select',
    templateUrl: './demo.component.html'
})
export class DateTimeSelectDemoComponent {
    date1='now';

    onDateChange($event) {
        console.log($event);
    }

    constructor(public doc: DateTimePickerTextService) {
    }
}
