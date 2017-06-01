import {Component} from "@angular/core";
import {TimeGr, TimeService} from "../../../../../service/time.service";


@Component({
    templateUrl: 'comboSelect.html'
})
export class ComboSelectDemoComponent {
    singleTimeComboValue = [{label: TimeService.getDate('now', TimeGr.date), closable: false}];
    rangeTimeComboValue = [{label: TimeService.getDate('now-7d', TimeGr.date)}, {label: TimeService.getDate('now', TimeGr.date)}];
}

