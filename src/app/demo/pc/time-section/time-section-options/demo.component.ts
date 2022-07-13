import {Component} from "@angular/core";
import {TimeSectionTextService} from "../text.service";

@Component({
    selector: 'time-section-options',
    templateUrl: './demo.component.html'
})
export class TimeSectionOptionsDemoComponent {
    timeSectionValue: any = {time: ['00:00-01:00', '05:00-06:00', '18:00-19:00'], date: [{label: 2, value: 2}, {label: 4, value: 4}]};
    layout;
    curTime = '2020-02';
    multipleHour = true;
    multipleDate = true;
    showDate = true;
    showWeek = true;
    showEveryday = true;

    toggleLayout() {
        this.layout = this.layout == 'horizontal' ? 'vertical' : 'horizontal';
    }

    sectionValueChange($event) {
        console.log('time section change to ', $event);
    }

    constructor(public text: TimeSectionTextService) {
    }
}
