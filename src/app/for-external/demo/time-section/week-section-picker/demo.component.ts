import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'week-section-picker',
    templateUrl: './demo.component.html'
})
export class WeekSectionPickerDemoComponent extends AsyncDescription {
    public demoPath = "demo/time-section/week-section-picker";

    public multipleSelect2 = true;
    public weekSection = [{ label: '周一', value: 1 }, { label: '周三', value: 3 }];

    public weekValueChange($event) {
        console.log('week section picker change to ', $event);
    }
}
