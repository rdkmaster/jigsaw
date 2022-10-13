import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'date-time-picker-gr-second',
    templateUrl: './demo.component.html'
})
export class DateTimePickerGrSecondComponent extends AsyncDescription {
    public demoPath = "demo/date-time-picker/gr-second";

    public date = "now";

    public dateChange($event) {
        console.log($event);
    }
}
