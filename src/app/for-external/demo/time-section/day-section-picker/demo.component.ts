import { Component } from "@angular/core";
import { TimeSectionTextService } from "../doc.service";

@Component({
    selector: 'day-section-picker',
    templateUrl: './demo.component.html'
})
export class DaySectionPickerDemoComponent {
    public daySection = [{ label: 2, value: 2 }, { label: 4, value: 4 }];
    public showLastDay = true;
    public curTime = '2020-02';
    public multipleSelect3 = true;

    public dayValueChange($event) {
        console.log('day section picker change to ', $event);
    }

    constructor(public doc: TimeSectionTextService) {
    }
}
