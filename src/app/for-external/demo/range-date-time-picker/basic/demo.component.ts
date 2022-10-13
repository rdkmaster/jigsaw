import {AfterViewInit, ChangeDetectorRef, Component, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'range-data-time-picker-basic',
    templateUrl: './demo.component.html'
})
export class RangeDateTimeBasicDemoComponent extends AsyncDescription implements AfterViewInit {
    public demoPath = "demo/range-date-time-picker/basic";

    constructor(public changeDetectorRef: ChangeDetectorRef, http: HttpClient, el: ElementRef) {
        super(http, el);
    }

    beginDate = "now-1d";
    endDate = "now";

    ngAfterViewInit() {
        this.changeDetectorRef.detectChanges();
    }
}
