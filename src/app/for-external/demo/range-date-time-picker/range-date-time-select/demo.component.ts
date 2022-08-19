import {Component} from "@angular/core";
import {RangeDataTimePickerTextService} from "../doc.service";

@Component({
    selector: 'list-lite-range-date-time-select',
    templateUrl: './demo.component.html',
})
export class RangeDateTimeSelectComponent {
    date = {beginDate: 'now-1d', endDate: 'now'};
    gr = ['date'];

    dateChange($event) {
        console.log($event)
    }

    constructor(public doc: RangeDataTimePickerTextService) {
    }
}
