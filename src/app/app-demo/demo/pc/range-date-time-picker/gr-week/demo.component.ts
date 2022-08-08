import {AfterContentInit, ChangeDetectorRef, Component} from "@angular/core";
import {RangeDataTimePickerTextService} from "../doc.service";

@Component({
    selector: 'range-date-time-picker-gr-week',
    templateUrl: './demo.component.html'
})
export class RangeDateTimeGrWeekComponent implements AfterContentInit {
    beginDate = "now-1d";

    endDate = "now";

    constructor(public changeDetectorRef: ChangeDetectorRef, public text: RangeDataTimePickerTextService) {
    }

    ngAfterContentInit() {
        this.changeDetectorRef.detectChanges();
    }
}
