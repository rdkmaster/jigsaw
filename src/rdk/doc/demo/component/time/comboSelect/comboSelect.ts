import {Component} from "@angular/core";
import {TimeGr, TimeService} from "../../../../../service/time.service";


@Component({
    templateUrl: 'comboSelect.html'
})
export class ComboSelectDemoComponent {
    date:string = 'now';
    singleTimeComboValue = [{label: TimeService.getFormateDate(this.date, TimeGr.date), closable: false}];

    beginDate:string = 'now-7d';
    endDate:string = 'now';
    rangeTimeComboValue = [
        {label: TimeService.getFormateDate(this.beginDate, TimeGr.date), closable: false},
        {label: TimeService.getFormateDate(this.endDate, TimeGr.date), closable: false}
    ];
}

