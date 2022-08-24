import { Component } from "@angular/core";
import { TimeSectionTextService } from "../doc.service";

@Component({
    selector: 'time-section-basic',
    templateUrl: './demo.component.html'
})
export class TimeSectionBasicDemoComponent {
    public timeSectionValue: any = { time: ['05:00-06:00'], date: [{ label: 2, value: 2 }] };
    public layout = 'vertical';
    public curTime = '2020-02';
    public multipleHour = false;
    public multipleDate = false;
    public showDate = true;
    public showWeek = true;
    public showEveryday = true;

    public sectionValueChange($event) {
        console.log('time section change to ', $event);
    }

    constructor(public doc: TimeSectionTextService) {
    }
}
