import { Component } from "@angular/core";
import { RangeDataTimePickerTextService } from "../doc.service";

@Component({
    selector: 'range-data-time-picker-limit',
    templateUrl: './demo.component.html'
})
export class RangeDateTimeLimitComponent {
    public beginDate = "now-1d";
    public endDate = "now";
    public limitStart = 'now-5d';
    public limitEnd = 'now+5d';

    constructor(public doc: RangeDataTimePickerTextService) {
    }
}
