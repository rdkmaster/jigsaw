import {AfterViewInit, ChangeDetectorRef, Component} from "@angular/core";
import {RangeDataTimePickerTextService} from "../text.service";

@Component({
    selector: 'basic-range-data-time-picker',
    templateUrl: './demo.component.html',
    styles: [`
        .demo-container h4 {
            font-size: 20px;
            margin-bottom: 20px;
        }

        .demo-container h5 {
            font-size: 16px;
            margin-bottom: 10px
        }

        .demo-container p {
            font-size: 14px;
            margin: 10px 0 20px 0
        }
    `]
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
