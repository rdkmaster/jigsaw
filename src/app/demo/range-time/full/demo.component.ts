import {Component} from "@angular/core";
import {Shortcut} from "jigsaw/component/time";
import {RangeTimeDataRanges} from "jigsaw/component/range-time";
import {GrItem} from "jigsaw/component/time/time";
import {TimeGr} from "jigsaw/service/time.service";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class RangeTimeFullComponent {
    // demo-1
    beginDate1 = "now-1d";
    endDate1 = "now";
    limitStartList = ['now', 'now-5d', 'now-10d'];
    limitEndList = ['now', 'now+5d', 'now+10d'];
    limitStart = 'now-5d';
    limitEnd = 'now+5d';

    // demo-2
    beginDate2 = "now-1d";
    endDate2 = "now";
    grList = ['second', 'minute', 'hour', 'date', 'week', 'month'];
    gr = this.grList[3];

    // demo-3
    beginDate3 = "now-1d";
    endDate3 = "now";
    shortcuts: Shortcut[] = [
        {
            label: "自定义",
            dateRange: ["now-15d", "now"]
        },
        {
            label: "这周",
            dateRange: RangeTimeDataRanges.RecentWeek
        }
    ];
    grItems: GrItem[] = [
        {
            label: "Day",
            value: TimeGr.date,
            shortcuts: this.shortcuts, span: "15d"
        },
        {
            label: "Hour",
            value: TimeGr.hour
        },
        {
            label: "Week",
            value: TimeGr.week
        },
        {
            label: "Month",
            value: TimeGr.month
        }
    ];

    // demo-4
    beginDate4 = "now-1d";
    endDate4 = "now";

    // demo-5
    beginDate5 = "now-1d";
    endDate5 = "now";
    weekStartList = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    weekStart = this.weekStartList[0];

    // demo-6
    beginDate6 = "now-1d";
    endDate6 = "now";

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawRangeTime',
    ];
}

