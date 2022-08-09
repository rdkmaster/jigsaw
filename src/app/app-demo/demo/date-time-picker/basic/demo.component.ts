import {Component} from "@angular/core";
import {DateTimePickerTextService} from "../doc.service";

@Component({
    selector: 'date-time-picker-basic',
    templateUrl: './demo.component.html'
})
export class DateTimePickerBasicDemoComponent {
    date = 'now';

    constructor(public text: DateTimePickerTextService) {
    }
}
