import { Component } from "@angular/core";
import { DateTimePickerTextService } from "../doc.service";

@Component({
    selector: 'date-time-picker-date-time-select',
    templateUrl: './demo.component.html'
})
export class DateTimeSelectDemoComponent {
    public date1 = 'now';

    public onDateChange($event) {
        console.log($event);
    }

    constructor(public doc: DateTimePickerTextService) {
    }
}
