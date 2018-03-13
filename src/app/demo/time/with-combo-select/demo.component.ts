import {Component} from "@angular/core";
import {TimeGr, TimeService} from "jigsaw/service/time.service";
import {ArrayCollection} from "jigsaw/core/data/array-collection";


@Component({
    templateUrl: './demo.component.html'
})
export class ComboSelectDemoComponent {
    date = TimeService.getFormatDate('now', TimeGr.date);
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
    tags: string[] = [
        'JigsawTime.dateChange',
        'JigsawRangeTime.change',
        'JigsawComboSelect'
    ];
}

