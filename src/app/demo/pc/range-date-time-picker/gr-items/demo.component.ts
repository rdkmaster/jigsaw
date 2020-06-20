import {AfterViewInit, ChangeDetectorRef, Component} from "@angular/core";
import {TimeGr, GrItem, Shortcut, RangeTimeDataRanges} from "jigsaw/public_api";

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
export class RangeDateTimeGrItemsComponent implements AfterViewInit {

    beginDate = "now-1d";

    endDate = "now";

    shortcuts: Shortcut[] = [{label: "最近三天", dateRange: ["now-3d", "now"]},
        {label: "本周", dateRange: RangeTimeDataRanges.RecentWeek}];

    grItems: GrItem[] = [
        {label: "Day", value: TimeGr.date, shortcuts: this.shortcuts, span: "15d"},
        {label: "Week", value: TimeGr.week},
        {label: "Month", value: TimeGr.month}];

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
