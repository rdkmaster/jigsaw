import {Component, ViewChild} from "@angular/core";
import {GrItem, JigsawDateTimeSelect, MarkDate, TimeGr} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
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
    clearable = true;

    valid = false;

    date5 = '2020-06-11 16:50:30';

    date8 = "now";
    weekStart = ['mon'];
    janX = [4];

    date9='2020-07-24';
    gr9;
    limitEnd9;

    date10;

    date11='2021-08-23';

    onDateChange($event) {
        console.log('dateChange=>', $event);
    }

    changeProp($event) {
        if($event == 'date') {
            this.date9 = '2020-05-10';
            this.gr9 = 'date';
            this.limitEnd9 = '2020-05-24';
        }

        if($event == 'week') {
            this.date9 = '2020-03-10';
            this.gr9 = 'week';
            this.limitEnd9 = '2020-03-24';
        }

        if($event == 'month') {
            this.date9 = '2020-02-10';
            this.gr9 = 'month';
            this.limitEnd9 = '2020-02-24';
        }
    }

    @ViewChild("dateTimeSelect12")
    public dateTimeSelect12: JigsawDateTimeSelect;

    public clearDate() {
        this.dateTimeSelect12.clearDate();
    }

    public date13;

    ngOnInit() {
        this.date13 = '2023-05-20';

        setTimeout(() => {
            this.date10 = '2020-03-24'
        })
    }

    public date14;
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
