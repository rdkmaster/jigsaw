import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class TimePickerFloatPositionDemoComponent {
    floatPosition = ['topLeft'];

    valueChange($event) {
        console.log('time change to ', $event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
