import {AfterContentInit, ChangeDetectorRef, Component, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'range-date-time-picker-gr-month',
    templateUrl: './demo.component.html'
})
export class RangeDateTimeGrMonthComponent extends AsyncDescription implements AfterContentInit {
    public demoPath = "demo/range-date-time-picker/gr-month";

    beginDate = "now-1d";

    endDate = "now";

    constructor(public changeDetectorRef: ChangeDetectorRef, http: HttpClient, el: ElementRef) {
        super(http, el);
    }

    ngAfterContentInit() {
        this.changeDetectorRef.detectChanges();
    }
}
