import { Component } from "@angular/core";
import { DatePickerTextService } from "../doc.service";

@Component({
    selector: 'date-picker-gr-month',
    templateUrl: './demo.component.html'
})
export class DatePickerGrMonthComponent {
    public date = "now";
    public gr = ['date'];

    public dateChange($event) {
        console.log($event);
    }

    constructor(public doc: DatePickerTextService) {
    }
}
