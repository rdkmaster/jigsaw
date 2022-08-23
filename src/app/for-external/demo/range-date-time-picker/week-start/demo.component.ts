import { Component } from "@angular/core";
import { RangeDataTimePickerTextService } from "../doc.service";

@Component({
    selector: 'range-date-time-picker-week-start',
    templateUrl: './demo.component.html'
})
export class RangeDateTimeWeekStartComponent {
    public beginDate = "now-1M";

    public endDate = "now";

    constructor(public doc: RangeDataTimePickerTextService) {
    }
}
