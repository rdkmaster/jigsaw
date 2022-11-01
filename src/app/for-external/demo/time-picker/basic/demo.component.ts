import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'time-picker-basic',
    templateUrl: './demo.component.html'
})
export class TimePickerBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/time-picker/basic";

    public time;
    valueChange($event) {
        console.log($event)
    }
}
