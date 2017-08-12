import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/core/data/array-collection";
import {TimeGr, TimeService} from "jigsaw/service/time.service";


@Component({
    templateUrl: 'app.component.html'
})
export class TemplateDrivenDemoComponent {
    firstName: string = 'jigsaw';
    remember: boolean = true;
    rangeTime = {beginDate: 'now-7d', endDate: 'now'};
    birthday: string = 'now-30y';
    rangeTimeComboValue = new ArrayCollection([
        {label: TimeService.getFormatDate(this.rangeTime.beginDate, TimeGr.date), closable: false},
        {label: TimeService.getFormatDate(this.rangeTime.endDate, TimeGr.date), closable: false}
    ]);

    formValue:any;

    submit(formValue) {
        console.log(formValue);
        this.formValue = formValue;
    }

    handleDateChange() {
        this.rangeTimeComboValue[0].label = this.rangeTime.beginDate;
        this.rangeTimeComboValue[1].label = this.rangeTime.endDate;
        this.rangeTimeComboValue.refresh();
    }
}
