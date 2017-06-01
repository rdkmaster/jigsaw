import {Component} from "@angular/core";
import {TimeGr, TimeService} from "../../../../../service/time.service";


@Component({
    templateUrl: 'comboSelect.html'
})
export class ComboSelectDemoComponent {
    singleTimeComboValue = [{label: TimeService.getFormateDate('now', TimeGr.date), closable: false}];
    rangeTimeComboValue = [{label: TimeService.getFormateDate('now-7d', TimeGr.date)}, {label: TimeService.getFormateDate('now', TimeGr.date)}];
}

