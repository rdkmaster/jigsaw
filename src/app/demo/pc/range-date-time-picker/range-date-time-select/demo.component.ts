import {AfterContentInit, ChangeDetectorRef, Component} from "@angular/core";
import {GrItem, RangeTimeDataRanges, Shortcut} from "../../../../../jigsaw/pc-components/date-and-time";
import {TimeGr} from "../../../../../jigsaw/common/service/time.service";

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
export class RangeDateTimeSelectComponent {
    date = {beginDate: 'now-1d', endDate: 'now'};
    gr = ['date'];

    date2 = {beginDate: 'now-1d', endDate: 'now'};
    shortcuts: Shortcut[] = [{label: "最近三天", dateRange: ["now-3d", "now"]},
        {label: "本周", dateRange: RangeTimeDataRanges.RecentWeek}];
    grItems: GrItem[] = [
        {label: "Day", value: TimeGr.date, shortcuts: this.shortcuts, span: "15d"},
        {label: "Week", value: TimeGr.week},
        {label: "Month", value: TimeGr.month}];

    date3 = {beginDate: 'now-1d', endDate: 'now'};
    limitStartList = ['now', 'now-5d', 'now-10d'];
    limitEndList = ['now', 'now+5d', 'now+10d'];
    limitStart = 'now-5d';
    limitEnd = 'now+5d';

    date4 = {beginDate: '2020-06-11 16:25:45', endDate: '2020-06-12 16:25:45'};

    date5 = {beginDate: 'now-1M', endDate: 'now'};
    weekStart = ['mon'];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
