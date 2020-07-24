import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class TimeSectionBasicDemoComponent {
    timeSection = ['00:00-01:00','05:00-06:00', '18:00-19:00'];

    valueChange($event) {
        console.log('time section change to ', $event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
