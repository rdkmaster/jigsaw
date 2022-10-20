import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'date-time-picker-gr-minute',
    templateUrl: './demo.component.html'
})
export class DateTimePickerGrMinuteComponent extends AsyncDescription {
    public demoPath = "demo/date-time-picker/gr-minute";

    public date = "now";

    public dateChange($event) {
        console.log($event);
    }
}
