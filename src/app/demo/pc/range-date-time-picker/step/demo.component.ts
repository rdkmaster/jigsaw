import {AfterViewInit, ChangeDetectorRef, Component} from "@angular/core";
import {RangeDataTimePickerTextService} from "../text.service";

@Component({
    selector: 'step-range-date-time-picker',
    templateUrl: './demo.component.html'
})
export class RangeDateTimeStepDemoComponent implements AfterViewInit {
    constructor(public changeDetectorRef: ChangeDetectorRef, public text: RangeDataTimePickerTextService) {
    }

    beginDate = "now-1d";
    endDate = "now";

    ngAfterViewInit() {
        this.changeDetectorRef.detectChanges();
    }
}
