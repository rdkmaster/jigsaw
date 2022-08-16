import {Component} from "@angular/core";
import {ArrayCollection, TimeGr, TimeService} from "jigsaw/public_api";
import {BoxTextService} from "../doc.service";

@Component({
    selector: 'box-form',
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
    constructor(public text: BoxTextService) {
    }
}
