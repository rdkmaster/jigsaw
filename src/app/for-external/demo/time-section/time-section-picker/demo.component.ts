import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'time-section-picker',
    templateUrl: './demo.component.html'
})
export class TimeSectionPickerDemoComponent extends AsyncDescription {
    public demoPath = "demo/time-section/time-section-picker";

    public multipleSelect = true;
    public timeSection = ['00:00-01:00', '05:00-06:00', '18:00-19:00'];

    public timeValueChange($event) {
        console.log('time section picker change to ', $event);
    }

    public sectionValueChange($event) {
        console.log('time section change to ', $event);
    }
}
