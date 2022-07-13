import {AfterContentInit, ChangeDetectorRef, Component} from "@angular/core";
import {RangeDataTimePickerTextService} from "../text.service";

@Component({
    selector: 'gr-range-date-time-picker',
    templateUrl: './demo.component.html'
})
export class RangeDateTimeGrComponent implements AfterContentInit {
    beginDate = "now-1d";

    endDate = "now";

    gr:any;

    constructor(public changeDetectorRef: ChangeDetectorRef, public text: RangeDataTimePickerTextService) {
    }

    ngAfterContentInit() {
        this.gr = [`date`];
        this.changeDetectorRef.detectChanges();
    }
}
