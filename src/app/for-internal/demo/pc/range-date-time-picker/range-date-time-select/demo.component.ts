import {Component, ViewChild} from "@angular/core";
import {GrItem, JigsawRangeDateTimeSelect, RangeTimeDataRanges, Shortcut, TimeGr} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css', './../../assets/demo.common.css']
})
export class RangeDateTimeSelectComponent {
    @ViewChild('select8')
    public rangeDateTimeSelect8: JigsawRangeDateTimeSelect;

    @ViewChild('select9')
    public rangeDateTimeSelect9: JigsawRangeDateTimeSelect;

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
    janX = [4];

    date6;
    gr6;
    limitEnd6;

    date7 = {beginDate: 'now-1D', endDate: 'now'};

    date8;

    date9 = {beginDate: 'now-1D', endDate: 'now'};

    public clearable = true;

    changeProp($event) {
        if($event == 'date') {
            this.date6 = {beginDate: '2020-05-10', endDate: '2020-06-10'};
            this.gr6 = 'date';
            this.limitEnd6 = '2020-06-24';
        }

        if($event == 'week') {
            this.date6 = {beginDate: '2020-03-10', endDate: '2020-04-10'};
            this.gr6 = 'week';
            this.limitEnd6 = '2020-04-24';
        }

        if($event == 'month') {
            this.date6 = {beginDate: '2020-02-10', endDate: '2020-03-10'};
            this.gr6 = 'month';
            this.limitEnd6 = '2020-03-24';
        }
    }

    dateChange($event) {
        console.log('dateChange=>', $event)
    }

    public showDate(rangeDateTimeSelect) {
        console.log(rangeDateTimeSelect.date);
    }

    public clearDate(rangeDateTimeSelect) {
        rangeDateTimeSelect.clearDate();
    }

    public date10;

    ngOnInit() {
        this.date10 = { beginDate: '2020-02-10', endDate: '2020-03-10' };
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
