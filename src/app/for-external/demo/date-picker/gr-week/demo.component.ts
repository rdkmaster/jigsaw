import {Component} from "@angular/core";
import {DatePickerTextService} from "../doc.service";

@Component({
    selector: 'date-picker-gr-week',
    templateUrl: './demo.component.html'
})
export class DatePickerGrWeekComponent {
    date = "now";

    gr = ['date'];

    dateChange($event) {
        console.log($event);
    }

    constructor(public doc: DatePickerTextService) {
    }
}
