import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'date-picker-gr-month',
    templateUrl: './demo.component.html'
})
export class DatePickerGrMonthComponent extends AsyncDescription {
    public demoPath = "demo/date-picker/gr-month";

    public date = "now";
    public gr = ['date'];

    public dateChange($event) {
        console.log($event);
    }
}
