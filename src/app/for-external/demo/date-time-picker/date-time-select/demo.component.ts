import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'date-time-picker-date-time-select',
    templateUrl: './demo.component.html'
})
export class DateTimeSelectDemoComponent extends AsyncDescription {
    public demoPath = "demo/date-time-picker/date-time-select";

    public date1 = 'now';

    public onDateChange($event) {
        console.log($event);
    }
}
