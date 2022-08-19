import {Component} from "@angular/core";
import {RangeDataTimePickerTextService} from "../doc.service";

@Component({
    selector: 'range-data-time-picker-limit',
    templateUrl: './demo.component.html'
})
export class RangeDateTimeLimitComponent {
    beginDate = "now-1d";
    endDate = "now";
    limitStart = 'now-5d';
    limitEnd = 'now+5d';

    constructor(public doc: RangeDataTimePickerTextService) {
    }
}
