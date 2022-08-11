import {AfterViewInit, ChangeDetectorRef, Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class RangeDateTimeStepDemoComponent implements AfterViewInit {
    constructor(public changeDetectorRef: ChangeDetectorRef) {
    }

    beginDate = "now-1d";
    endDate = "now";

    ngAfterViewInit() {
        this.changeDetectorRef.detectChanges();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
