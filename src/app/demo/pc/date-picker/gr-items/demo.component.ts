import {Component} from "@angular/core";
import {TimeGr, GrItem} from "jigsaw/public_api";
import {DatePickerTextService} from "../text.service";

@Component({
    selector: 'gr-items-date-picker',
    templateUrl: './demo.component.html'
})
export class DatePickerGrItemDemoComponent {
    date;

    grItems: GrItem[] = [
        {label: "Day", value: TimeGr.date},
        {label: "Week", value: TimeGr.week},
        {label: "Month", value: TimeGr.month}
    ];

    constructor(public text: DatePickerTextService) {
    }
}
