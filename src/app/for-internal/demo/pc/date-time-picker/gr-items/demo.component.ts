import {Component} from "@angular/core";
import {TimeGr, GrItem} from "jigsaw/public_api";

@Component({
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
