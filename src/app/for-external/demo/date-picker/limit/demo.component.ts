import {Component} from "@angular/core";
import {DatePickerTextService} from "../doc.service";

@Component({
    selector: 'limit-date-picker',
    templateUrl: './demo.component.html'
})
export class DatePickerLimitComponent {
    date1 = "now";
    limitStart = 'now-5d';
    limitEnd = 'now+5d';
    constructor(public doc: DatePickerTextService) {
    }
}
