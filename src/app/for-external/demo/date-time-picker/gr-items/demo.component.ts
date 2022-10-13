import {Component} from "@angular/core";
import {TimeGr, GrItem} from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'date-time-picker-gr-items',
    templateUrl: './demo.component.html'
})
export class DateTimePickerGrItemDemoComponent extends AsyncDescription {
    public demoPath = "demo/date-time-picker/gr-items";

    public date;

    public grItems: GrItem[] = [
        {label: "Time", value: TimeGr.second},
        {label: "Day", value: TimeGr.date},
        {label: "Week", value: TimeGr.week},
        {label: "Month", value: TimeGr.month}
    ];

    public dateChange($event) {
        console.log($event);
    }
}
