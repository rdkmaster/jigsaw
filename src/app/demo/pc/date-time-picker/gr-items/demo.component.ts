import {Component} from "@angular/core";
import {TimeGr, GrItem} from "jigsaw/public_api";
import {DateTimePickerTextService} from "../text.service";

@Component({
    selector: 'gr-items-date-time-picker',
    templateUrl: './demo.component.html'
})
export class DateTimePickerGrItemDemoComponent {
    date;

    grItems: GrItem[] = [
        {label: "Time", value: TimeGr.second},
        {label: "Day", value: TimeGr.date},
        {label: "Week", value: TimeGr.week},
        {label: "Month", value: TimeGr.month}
    ];

    dateChange($event) {
        console.log($event);
    }

    constructor(public text: DateTimePickerTextService) {
    }
}
