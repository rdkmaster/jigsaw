import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class TimePickerLimitDemoComponent {
    time;

    limitStart = '08:30:00';

    limitEnd = '17:40:00';

    valueChange($event) {
        console.log('time change to ', $event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
