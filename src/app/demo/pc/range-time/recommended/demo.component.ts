import {AfterViewInit, ChangeDetectorRef, Component} from "@angular/core";

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
export class RangeTimeRecommendedComponent implements AfterViewInit {
    beginDate = "now-1d";
    endDate = "now";

    constructor(public changeDetectorRef: ChangeDetectorRef) {
    }

    ngAfterViewInit() {
        this.changeDetectorRef.detectChanges();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawRangeTime.recommendedBegin',
        'JigsawRangeTime.recommendedEnd',
    ];
}

