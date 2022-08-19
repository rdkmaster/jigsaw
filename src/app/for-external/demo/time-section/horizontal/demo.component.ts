import {Component} from "@angular/core";
import {TimeSectionTextService} from "../doc.service";

@Component({
    selector: 'time-section-horizontal',
    templateUrl: './demo.component.html'
})
export class TimeSectionHorizontalDemoComponent {
    timeSection = ['00:00-01:00', '05:00-06:00', '18:00-19:00'];
    weekValueChange($event) {
        console.log('week section picker change to ', $event);
    }

    multipleSelect3 = true;
    showLastDay = true;

    dayValueChange($event) {
        console.log('day section picker change to ', $event);
    }

    timeSectionValue: any = {time: ['00:00-01:00', '05:00-06:00', '18:00-19:00'], date: [{label: 2, value: 2}, {label: 4, value: 4}]};
    layout = 'horizontal'
    curTime = '2020-02';
    multipleHour = true;
    multipleDate = true;
    showDate = true;
    showWeek = true;
    showEveryday = true;
    sectionValueChange($event) {
        console.log('time section change to ', $event);
    }

    constructor(public doc: TimeSectionTextService) {
    }
}
