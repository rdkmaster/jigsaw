import {Component} from "@angular/core";
import {DateTimePickerTextService} from "../text.service";

@Component({
    selector: 'basic-date-time-picker',
    templateUrl: './demo.component.html'
})
export class DateTimePickerBasicDemoComponent {
    date = 'now';

    constructor(public text: DateTimePickerTextService) {
    }
}
