import { Component } from "@angular/core";
import { TimeGr, GrItem } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'date-picker-gr-items',
    templateUrl: './demo.component.html'
})
export class DatePickerGrItemDemoComponent extends AsyncDescription {
    public demoPath = "demo/date-picker/gr-items";

    public date;
    public grItems: GrItem[] = [
        { label: "Day", value: TimeGr.date },
        { label: "Week", value: TimeGr.week },
        { label: "Month", value: TimeGr.month }
    ];
}
