import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/common/core/data/array-collection";
import {TimeGr, TimeService} from "jigsaw/common/service/time.service";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class FormDemoComponent {
    firstName: string = 'jigsaw';
    remember: boolean = true;
    rangeTime = {
        beginDate: TimeService.getFormatDate('now-7d', TimeGr.date),
        endDate: TimeService.getFormatDate('now', TimeGr.date)
    };
    birthday: string = 'now-30y';
    rangeTimeComboValue = new ArrayCollection([
        {label: this.rangeTime.beginDate, closable: false},
        {label: this.rangeTime.endDate, closable: false}
    ]);
    favoriteCities: ArrayCollection<any>;
    score: number = 30;
    isGreat: boolean = true;

    formValue: any;

    lastNamePattern = /^[a-z]+$/i;

    submit(formValue) {
        console.log(formValue);
        this.formValue = formValue;
    }

    onDateChange() {
        this.rangeTimeComboValue[0].label = this.rangeTime.beginDate;
        this.rangeTimeComboValue[1].label = this.rangeTime.endDate;
        this.rangeTimeComboValue.refresh();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}


