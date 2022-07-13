import {Component} from "@angular/core";
import {DateTimePickerTextService} from "../text.service";

@Component({
    selector: 'disabled-date-time-picker',
    templateUrl: './demo.component.html'
})
export class DateTimePickerDisabledDemoComponent {
    disabled = true;

    constructor(public text: DateTimePickerTextService) {
    }
}
