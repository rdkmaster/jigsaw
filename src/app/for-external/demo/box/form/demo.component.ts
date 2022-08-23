import { Component } from "@angular/core";
import { ArrayCollection, TimeGr, TimeService } from "jigsaw/public_api";
import { BoxTextService } from "../doc.service";

@Component({
    selector: 'box-form',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class FormDemoComponent {
    public firstName: string = 'jigsaw';
    public remember: boolean = true;
    public rangeTime = {
        beginDate: TimeService.getFormatDate('now-7d', TimeGr.date),
        endDate: TimeService.getFormatDate('now', TimeGr.date)
    };
    public birthday: string = 'now-30y';
    public rangeTimeComboValue = new ArrayCollection([
        { label: this.rangeTime.beginDate, closable: false },
        { label: this.rangeTime.endDate, closable: false }
    ]);
    public favoriteCities: ArrayCollection<any>;
    public score: number = 30;
    public isGreat: boolean = true;

    public formValue: any;

    public lastNamePattern = /^[a-z]+$/i;

    public submit(formValue) {
        console.log(formValue);
        this.formValue = formValue;
    }

    public onDateChange() {
        this.rangeTimeComboValue[0].label = this.rangeTime.beginDate;
        this.rangeTimeComboValue[1].label = this.rangeTime.endDate;
        this.rangeTimeComboValue.refresh();
    }
    constructor(public doc: BoxTextService) {
    }
}
