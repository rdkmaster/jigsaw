import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'date-time-picker-confirm-button',
    templateUrl: './demo.component.html'
})
export class DateTimePickerConfirmButtonDemoComponent extends AsyncDescription {
    public demoPath = "demo/date-time-picker/confirm-button";

    public showConfirmButton = true;
    public date1 = 'now';
    public date2 = 'now';
    public date3 = { beginDate: 'now-1d', endDate: 'now' };
    public beginDate = "now-1d";
    public endDate = "now";
}
