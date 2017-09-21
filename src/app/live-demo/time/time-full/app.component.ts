import {Component} from "@angular/core";
import {TimeGr} from "jigsaw/service/time.service";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class TimeFullComponent {
    // demo-1
    date1 = "now";
    limitStartList = ['now-1d', 'now-5d', 'now-10d'];
    limitEndList = ['now', 'now+5d', 'now+10d'];
    limitStart = 'now-10d';
    limitEnd = 'now+5d';

    // demo-2
    date2 = 'now';
    grList = ['second', 'minute', 'hour', 'date', 'week', 'month'];
    gr = this.grList[3];

    // demo-3
    date3 = 'now';
    grItems = [
        {label: "Day", value: TimeGr.date},
        {label: "Week", value: TimeGr.week},
        {label: "Month", value: TimeGr.month}
    ];

    // demo-4
    date4 = 'now';

    // demo-5
    date5 = "now";
    weekStartList = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    weekStart = this.weekStartList[0];

    // demo-6
    date6 = 'now';
}

