import {Component} from "@angular/core";
import {TimeGr, TimeService, ArrayCollection} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class ComboSelectDemoComponent {
    date = TimeService.getFormatDate('now', TimeGr.second);
    singleTimeComboValue = new ArrayCollection([{
        label: this.date,
        closable: false
    }]);

    beginDate = TimeService.getFormatDate('now-7d', TimeGr.date);
    endDate = TimeService.getFormatDate('now', TimeGr.date);
    rangeTimeComboValue = new ArrayCollection([
        {label: this.beginDate, closable: false},
        {label: this.endDate, closable: false}
    ]);

    handleDateChange(value) {
        this.singleTimeComboValue[0].label = this.date;
        this.singleTimeComboValue.refresh();
    }

    handleRangeDateChange() {
        this.rangeTimeComboValue[0].label = this.beginDate;
        this.rangeTimeComboValue[1].label = this.endDate;
        this.rangeTimeComboValue.refresh();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = 'ComboSelect和Time、RangeTime组合使用说明';
    description: string = require('!!raw-loader!./readme.md');
}
