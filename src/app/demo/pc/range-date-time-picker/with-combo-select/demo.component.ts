import {Component} from "@angular/core";
import {TimeGr, TimeService} from "jigsaw/common/service/time.service";
import {ArrayCollection} from "jigsaw/common/core/data/array-collection";


@Component({
    templateUrl: './demo.component.html'
})
export class RangeDateTimeComboSelectDemoComponent {
    beginDate = TimeService.getFormatDate('now-7d', TimeGr.second);
    endDate = TimeService.getFormatDate('now', TimeGr.second);
    rangeTimeComboValue = new ArrayCollection([
        {label: this.beginDate, closable: false},
        {label: this.endDate, closable: false}
    ]);

    handleRangeDateChange() {
        this.rangeTimeComboValue[0].label = this.beginDate;
        this.rangeTimeComboValue[1].label = this.endDate;
        this.rangeTimeComboValue.refresh();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

