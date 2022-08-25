import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'time-picker-limit',
    templateUrl: './demo.component.html'
})
export class TimePickerLimitDemoComponent extends AsyncDescription {
    public demoPath = "demo/time-picker/limit";

    public time;

    public limitStart = '08:30:00';

    public limitEnd = '17:40:00';

    public valueChange($event) {
        console.log($event)
    }
}
