import {Component} from "@angular/core";
import {DatePickerTextService} from "../doc.service";

@Component({
    selector: 'date-picker-basic',
    templateUrl: './demo.component.html'
})
export class DatePickerBasicDemoComponent {
    date;
    constructor(public text: DatePickerTextService) {
    }
}
