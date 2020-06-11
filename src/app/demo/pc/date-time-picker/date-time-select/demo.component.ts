import {Component} from "@angular/core";
import {GrItem, MarkDate} from "../../../../../jigsaw/pc-components/date-and-time";
import {TimeGr} from "../../../../../jigsaw/common/service/time.service";

@Component({
    templateUrl: './demo.component.html'
})
export class DateTimeSelectDemoComponent {
    date1='now';
    gr = ['date'];

    date2;
    grItems: GrItem[] = [
        {label: "Time", value: TimeGr.second},
        {label: "Day", value: TimeGr.date},
        {label: "Week", value: TimeGr.week},
        {label: "Month", value: TimeGr.month}
    ];

    date3 = "now";
    limitStartList = ['now-1d', 'now-5d', 'now-10d'];
    limitEndList = ['now', 'now+5d', 'now+10d'];
    limitStart = 'now-10d';
    limitEnd = 'now+5d';

    date4;
    markDates: MarkDate[] = [
        {date: 'now-8d', mark: 'error', label: '警告日期'},
        {date: {from: 'now-2d', to: 'now+2d'}, mark: 'recommend', label: '推荐日期'},
        {date: ['now-3d', 'now-5d'], mark: 'warn', label: '提醒日期'},
        {date: {from: 'now+30d', to: 'now+32d'}, mark: 'error', label: '警告日期'},
        {date: {from: 'now-32d', to: 'now-30d'}, mark: 'warn', label: '提醒日期'},
    ];

    disabled = true;

    valid = false;

    date5 = '2020-06-11 16:50:30';

    onDateChange($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
