import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'limit-date-picker',
    templateUrl: './demo.component.html'
})
export class DatePickerLimitComponent extends AsyncDescription {
    public demoPath = "demo/date-picker/limit";

    public date1 = "now";
    public limitStart = 'now-5d';
    public limitEnd = 'now+5d';
}
