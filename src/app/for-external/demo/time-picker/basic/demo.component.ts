import { Component } from "@angular/core";
import { TimePickerTextService } from "../doc.service";

@Component({
    selector: 'time-picker-basic',
    templateUrl: './demo.component.html'
})
export class TimePickerBasicDemoComponent {
    public time;
    valueChange($event) {
        console.log($event)
    }

    constructor(public doc: TimePickerTextService) {
    }
}
