import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'date-time-picker-basic',
    templateUrl: './demo.component.html'
})
export class DateTimePickerBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/date-time-picker/basic";

    public date = 'now';
}
