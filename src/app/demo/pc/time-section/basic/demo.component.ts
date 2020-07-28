import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class TimeSectionBasicDemoComponent {
    timeSection = ['00:00-01:00','05:00-06:00', '18:00-19:00'];

    timeValueChange($event) {
        console.log('time section picker change to ', $event);
    }

    weekSection = [{label: '周一', value: 1}, {label: '周三', value: 3}];

    weekValueChange($event) {
        console.log('week section picker change to ', $event);
    }

    daySection = [{label: 2, value: 2}, {label: 4, value: 4}];
    showLastDay = true;

    dayValueChange($event) {
        console.log('day section picker change to ', $event);
    }

    layout;

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
