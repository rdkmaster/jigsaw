import {Component} from "@angular/core";
import {DateTimePickerTextService} from "../doc.service";

@Component({
    selector: 'date-time-picker-confirm-button',
    templateUrl: './demo.component.html'
})
export class DateTimePickerConfirmButtonDemoComponent {
    showConfirmButton = true;
    date1 = 'now';
    date2 = 'now';
    date3 = {beginDate: 'now-1d', endDate: 'now'};
    beginDate = "now-1d";
    endDate = "now";

    constructor(public doc: DateTimePickerTextService) {
    }
}
