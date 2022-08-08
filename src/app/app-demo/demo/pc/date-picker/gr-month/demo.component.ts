import {Component} from "@angular/core";
import {DatePickerTextService} from "../doc.service";

@Component({
    selector: 'date-picker-gr-month',
    templateUrl: './demo.component.html'
})
export class DatePickerGrMonthComponent {
    date = "now";

    gr = ['date'];

    dateChange($event) {
        console.log($event);
    }

    constructor(public text: DatePickerTextService) {
    }
}
