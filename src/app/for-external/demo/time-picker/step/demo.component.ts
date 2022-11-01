import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'time-picker-step',
    templateUrl: './demo.component.html'
})
export class TimePickerStepDemoComponent extends AsyncDescription {
    public demoPath = "demo/time-picker/step";

    time;
    step = [5];
    valueChange($event) {
    }
}
