import {Component} from "@angular/core";
import {TimeGr, GrItem} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class DatePickerGrItemDemoComponent {
    date;

    grItems: GrItem[] = [
        {label: "Day", value: TimeGr.date},
        {label: "Week", value: TimeGr.week},
        {label: "Month", value: TimeGr.month}
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
