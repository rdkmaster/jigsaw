import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'time-picker-gr',
    templateUrl: './demo.component.html'
})
export class TimePickerGrDemoComponent extends AsyncDescription {
    public demoPath = "demo/time-picker/gr";

    public time;
    public gr = ['time', 'time_hour_minute', 'time_minute_second', 'time_hour'];

    public valueChange($event) {
        console.log($event)
    }
}
