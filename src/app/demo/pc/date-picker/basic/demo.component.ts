import {Component} from "@angular/core";
import {DatePickerTextService} from "../text.service";

@Component({
    selector: 'basic-date-picker',
    templateUrl: './demo.component.html'
})
export class DatePickerBasicDemoComponent {
    date;
    constructor(public text: DatePickerTextService) {
    }
}
