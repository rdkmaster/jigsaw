import { Component } from "@angular/core";
import { TimeSectionTextService } from "../doc.service";

@Component({
    selector: 'time-section-picker',
    templateUrl: './demo.component.html'
})
export class TimeSectionPickerDemoComponent {
    public multipleSelect = true;
    public timeSection = ['00:00-01:00', '05:00-06:00', '18:00-19:00'];

    public timeValueChange($event) {
        console.log('time section picker change to ', $event);
    }

    public sectionValueChange($event) {
        console.log('time section change to ', $event);
    }

    constructor(public doc: TimeSectionTextService) {
    }
}
