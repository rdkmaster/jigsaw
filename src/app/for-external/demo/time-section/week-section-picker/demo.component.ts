import { Component } from "@angular/core";
import { TimeSectionTextService } from "../doc.service";

@Component({
    selector: 'week-section-picker',
    templateUrl: './demo.component.html'
})
export class WeekSectionPickerDemoComponent {
    public multipleSelect2 = true;
    public weekSection = [{ label: '周一', value: 1 }, { label: '周三', value: 3 }];

    public weekValueChange($event) {
        console.log('week section picker change to ', $event);
    }

    constructor(public doc: TimeSectionTextService) {
    }
}
