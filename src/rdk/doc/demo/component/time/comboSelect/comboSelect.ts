import {Component} from "@angular/core";
import {TimeGr, TimeService} from "../../../../../service/time.service";


@Component({
    templateUrl: 'comboSelect.html'
})
export class ComboSelectDemoComponent {
    date:string = 'now';
    singleTimeComboValue = [{label: TimeService.getFormatDate(this.date, TimeGr.date), closable: false}];

    beginDate:string = 'now-7d';
    endDate:string = 'now';
    rangeTimeComboValue = [
        {label: TimeService.getFormatDate(this.beginDate, TimeGr.date), closable: false},
        {label: TimeService.getFormatDate(this.endDate, TimeGr.date), closable: false}
    ];
}

