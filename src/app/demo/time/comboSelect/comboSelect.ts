import {Component} from "@angular/core";
import {TimeGr, TimeService} from "jigsaw/service/time.service";
import {ArrayCollection} from "jigsaw/core/data/array-collection";


@Component({
    templateUrl: 'comboSelect.html'
})
export class ComboSelectDemoComponent {
    date:string = 'now';
    singleTimeComboValue = new ArrayCollection([{label: TimeService.getFormatDate(this.date, TimeGr.date), closable: false}]);

    beginDate:string = 'now-7d';
    endDate:string = 'now';
    rangeTimeComboValue = new ArrayCollection([
        {label: TimeService.getFormatDate(this.beginDate, TimeGr.date), closable: false},
        {label: TimeService.getFormatDate(this.endDate, TimeGr.date), closable: false}
    ]);

    handleDateChange(value){
        this.singleTimeComboValue = new ArrayCollection([{label: value,closable: false}]);
    }

    handleDeginDateChange(value){
        this.rangeTimeComboValue = new ArrayCollection([{label:value, closable: false}, this.rangeTimeComboValue[1]]);
    }

    handleEndDateChange(value){
        this.rangeTimeComboValue = new ArrayCollection([this.rangeTimeComboValue[0], {label: value, closable: false}]);
    }
}

