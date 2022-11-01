import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'date-picker-gr-week',
    templateUrl: './demo.component.html'
})
export class DatePickerGrWeekComponent extends AsyncDescription {
    public demoPath = "demo/date-picker/gr-week";

    public date = "now";
    public gr = ['date'];

    public dateChange($event) {
        console.log($event);
    }
}
