import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'list-lite-range-date-time-select',
    templateUrl: './demo.component.html',
})
export class RangeDateTimeSelectComponent extends AsyncDescription {
    public demoPath = "demo/range-date-time-picker/range-date-time-select";

    public date = { beginDate: 'now-1d', endDate: 'now' };
    public gr = ['date'];

    public dateChange($event) {
        console.log($event)
    }
}
