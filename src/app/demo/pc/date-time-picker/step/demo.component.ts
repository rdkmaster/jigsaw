import {Component} from "@angular/core";
import {DateTimePickerTextService} from "../text.service";

@Component({
    selector: 'step-date-time-picker',
    templateUrl: './demo.component.html'
})
export class DateTimePickerStepDemoComponent {
    date='now';

    constructor(public text: DateTimePickerTextService) {
    }
}
