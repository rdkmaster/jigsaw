import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'time-section-horizontal',
    templateUrl: './demo.component.html'
})
export class TimeSectionHorizontalDemoComponent extends AsyncDescription {
    public demoPath = "demo/time-section/horizontal";

    public timeSectionValue: any = { time: ['00:00-01:00', '05:00-06:00', '18:00-19:00'], date: [{ label: 2, value: 2 }, { label: 4, value: 4 }] };
    public layout = 'horizontal'
    public curTime = '2020-02';
    public multipleHour = true;
    public multipleDate = true;
    public showDate = true;
    public showWeek = true;
    public showEveryday = true;

    public sectionValueChange($event) {
        console.log('time section change to ', $event);
    }
}
