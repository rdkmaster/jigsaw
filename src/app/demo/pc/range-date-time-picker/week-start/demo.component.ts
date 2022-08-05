import {Component} from "@angular/core";
import {RangeDataTimePickerTextService} from "../doc.service";

@Component({
    selector: 'range-date-time-picker-week-start',
    templateUrl: './demo.component.html'
})
export class RangeDateTimeWeekStartComponent {
    beginDate = "now-1M";

    endDate = "now";

    constructor(public text: RangeDataTimePickerTextService) {
    }
}
