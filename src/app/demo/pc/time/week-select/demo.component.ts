import {AfterContentInit, Component} from "@angular/core";
import {TimeGr, TimeService, ArrayCollection} from "jigsaw/public_api";

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
export class TimeWeekSelectComponent {
    date = "now";
    weekStart = ['sun'];

    date2: any = 'now';
    singleTimeComboValue: any = new ArrayCollection([{
        label: this.date2,
        closable: false
    }]);

    handleDateChange() {
        this.singleTimeComboValue[0].label =  `${this.date2.year}-${this.date2.week}`;
        this.singleTimeComboValue.refresh();
    }

    ngOnInit() {
        let timeStr = TimeService.convertValue(this.singleTimeComboValue.label, TimeGr.week);
        timeStr = TimeService.getWeekYear(timeStr) + '-' + TimeService.getWeekOfYear(timeStr);
        this.singleTimeComboValue = [{label: timeStr, closable: false}];
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
