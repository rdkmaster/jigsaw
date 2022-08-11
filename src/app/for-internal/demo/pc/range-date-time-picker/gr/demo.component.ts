import {AfterContentInit, ChangeDetectorRef, Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class RangeDateTimeGrComponent implements AfterContentInit {
    beginDate = "now-1d";

    endDate = "now";

    gr:any;

    constructor(public changeDetectorRef: ChangeDetectorRef) {
    }

    ngAfterContentInit() {
        this.gr = [`date`];
        this.changeDetectorRef.detectChanges();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
