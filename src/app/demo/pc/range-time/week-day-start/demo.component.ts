import {AfterContentInit, Component} from "@angular/core";


@Component({
    templateUrl: './demo.component.html',
    styles: [`
        h4 {
            font-size: 20px;
            margin-bottom: 20px;
        }

        p {
            font-size: 14px;
            margin: 10px 0 20px 0
        }
    `]
})
export class RangeTimeWeekDayStartComponent implements AfterContentInit {
    beginDate = "now-20d";

    endDate = "now";

    weekStartList = [{label: "sun"}, {label: "mon"}, {label: "tue"},
        {label: "wed"}, {label: "thu"}, {label: "fri"}, {label: "sat"}];

    weekDayStartList = [{label: "doy4"}, {label: "doy6"}, {label: "doy7"}, {label: "doy12"}];

    weekStart;
    weekDayStart;

    ngAfterContentInit() {
        this.weekStart = [this.weekStartList[0]];
        this.weekDayStart = [this.weekDayStartList[1]];
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [];
}

