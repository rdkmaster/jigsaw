import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class TimePickerStepDemoComponent {
    time;
    step = [5];

    valueChange($event) {
        console.log('time change to ',$event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
