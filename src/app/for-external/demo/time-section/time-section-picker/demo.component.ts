import {Component} from "@angular/core";
import {TimeSectionTextService} from "../doc.service";

@Component({
    selector: 'time-section-picker',
    templateUrl: './demo.component.html'
})
export class TimeSectionPickerDemoComponent {
    multipleSelect1 = true;
    timeSection = ['00:00-01:00', '05:00-06:00', '18:00-19:00'];

    timeValueChange($event) {
        console.log('time section picker change to ', $event);
    }
    weekValueChange($event) {
        console.log('week section picker change to ', $event);
    }

    multipleSelect3 = true;
    showLastDay = true;

    dayValueChange($event) {
        console.log('day section picker change to ', $event);
    }

    timeSectionValue: any = {time: ['00:00-01:00', '05:00-06:00', '18:00-19:00'], date: [{label: 2, value: 2}, {label: 4, value: 4}]};
    layout;
    multipleHour = true;
    showDate = true;
    toggleLayout() {
        this.layout = this.layout == 'horizontal' ? 'vertical' : 'horizontal';
    }

    sectionValueChange($event) {
        console.log('time section change to ', $event);
    }

    constructor(public text: TimeSectionTextService) {
    }
}
