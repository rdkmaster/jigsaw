import {AfterViewInit, ChangeDetectorRef, Component} from "@angular/core";
import {TimeGr, GrItem, Shortcut, RangeTimeDataRanges} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class RangeDateTimeGrItemsComponent implements AfterViewInit {

    beginDate = "now-1d";

    endDate = "now";

    // 这个demo还必须用于演示shortcut (/pc/range-date-time-picker/shortcut)，因此这部分功能不能去
    shortcuts: Shortcut[] = [{label: "最近三天", dateRange: ["now-3d", "now"]},
        {label: "本周", dateRange: RangeTimeDataRanges.RecentWeek}];

    grItems: GrItem[] = [
            {label: "Day", value: TimeGr.date, shortcuts: this.shortcuts, span: "15d"},
            {label: "Week", value: TimeGr.week},
            {label: "Month", value: TimeGr.month}
        ];

    constructor(public changeDetectorRef: ChangeDetectorRef) {
    }

    ngAfterViewInit() {
        this.changeDetectorRef.detectChanges();
    }

    onChange($event) {
        console.log($event)
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
