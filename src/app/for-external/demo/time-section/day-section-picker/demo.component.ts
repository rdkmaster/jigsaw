import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'day-section-picker',
    templateUrl: './demo.component.html'
})
export class DaySectionPickerDemoComponent extends AsyncDescription {
    public demoPath = "demo/time-section/day-section-picker";

    public daySection = [{ label: 2, value: 2 }, { label: 4, value: 4 }];
    public showLastDay = true;
    public curTime = '2020-02';
    public multipleSelect3 = true;

    public dayValueChange($event) {
        console.log('day section picker change to ', $event);
    }
}
