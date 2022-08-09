import {AfterViewInit, ChangeDetectorRef, Component} from "@angular/core";
import {RangeDataTimePickerTextService} from "../doc.service";

@Component({
    selector: 'range-data-time-picker-basic',
    templateUrl: './demo.component.html'
})
export class RangeDateTimeBasicDemoComponent implements AfterViewInit {
    constructor(public changeDetectorRef: ChangeDetectorRef, public text: RangeDataTimePickerTextService) {
    }

    beginDate = "now-1d";
    endDate = "now";

    ngAfterViewInit() {
        this.changeDetectorRef.detectChanges();
    }
}
