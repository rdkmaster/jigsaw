import {AfterViewInit, ChangeDetectorRef, Component} from "@angular/core";

@Component({
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
