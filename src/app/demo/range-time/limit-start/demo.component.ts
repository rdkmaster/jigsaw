import {AfterContentInit, ChangeDetectorRef, Component} from "@angular/core";


@Component({
    templateUrl: './demo.component.html',
    styles: [`
        h4 {
            font-size: 20px;
            margin-bottom: 20px;
        }

        h5 {
            font-size: 16px;
            margin-bottom: 10px
        }

        p {
            font-size: 14px;
            margin: 10px 0 20px 0
        }
    `]
})
export class RangeTimeLimitStartComponent implements AfterContentInit {
    beginDate = "now-1d";

    endDate = "now";

    datas = [{label: "now"}, {label: "now-1d"}, {label: "now-5d"}];

    limitStart

    constructor(public changeDetectorRef: ChangeDetectorRef) {
    }

    ngAfterContentInit() {
        this.limitStart = [{label: "now"}];
        this.changeDetectorRef.detectChanges();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

