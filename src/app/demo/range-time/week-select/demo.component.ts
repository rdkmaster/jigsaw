import {AfterContentInit, Component} from "@angular/core";
import {TimeGr, TimeService} from "jigsaw/service/time.service";
import {ArrayCollection} from "jigsaw/core/data/array-collection";


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
export class RangeTimeWeekSelectComponent implements AfterContentInit {
    beginDate = "now-20d";

    endDate = "now";

    weekStartList = [{label: "sun"}, {label: "mon"}, {label: "tue"},
        {label: "wed"}, {label: "thu"}, {label: "fri"}, {label: "sat"}];

    weekDayStartList = [{label: "doy4"}, {label: "doy6"}, {label: "doy7"}, {label: "doy12"}];

    weekStart;
    weekDayStart;

    beginDate2: any = 'now-20d';
    endDate2: any = 'now';
    rangeTimeComboValue: any = new ArrayCollection([
        {label: this.beginDate2, closable: false},
        {label: this.endDate2, closable: false}
    ]);

    handleRangeDateChange() {
        this.rangeTimeComboValue[0].label = `${this.beginDate2.year}-${this.beginDate2.week}`;
        this.rangeTimeComboValue[1].label = `${this.endDate2.year}-${this.endDate2.week}`;
        this.rangeTimeComboValue.refresh();
    }

    ngOnInit() {
        let tempRangeTime = [];
        this.rangeTimeComboValue.forEach((item, index) => {
            let timeStr = TimeService.convertValue(item.label, TimeGr.week);
            timeStr = TimeService.getWeekYear(timeStr) + '-' + TimeService.getWeekOfYear(timeStr);
            tempRangeTime[index] = {label: timeStr, closable: false};
        });
        this.rangeTimeComboValue = tempRangeTime;
    }

    ngAfterContentInit() {
        this.weekStart = [this.weekStartList[0]];
        this.weekDayStart = [this.weekDayStartList[1]];
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

