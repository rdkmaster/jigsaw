import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class TimeSectionBasicDemoComponent {
    multipleSelect1 = true;
    timeSection = ['00:00-01:00', '05:00-06:00', '18:00-19:00'];

    timeValueChange($event) {
        console.log('time section picker change to ', $event);
    }

    multipleSelect2 = true;
    weekSection = [{label: '周一', value: 1}, {label: '周三', value: 3}];

    weekValueChange($event) {
        console.log('week section picker change to ', $event);
    }

    multipleSelect3 = true;
    daySection = [{label: 2, value: 2}, {label: 4, value: 4}];
    showLastDay = true;

    dayValueChange($event) {
        console.log('day section picker change to ', $event);
    }

    timeSectionValue: any = {time: ['00:00-01:00', '05:00-06:00', '18:00-19:00'], date: [{label: 2, value: 2}, {label: 4, value: 4}]};
    layout;
    curTime = '2020-02';
    multipleHour = true;
    multipleDate = true;

    toggleLayout() {
        this.layout = this.layout == 'horizontal' ? 'vertical' : 'horizontal';
    }

    sectionValueChange($event) {
        console.log('time section change to ', $event);
    }


    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
