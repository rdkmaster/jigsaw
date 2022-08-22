import { Component } from "@angular/core";
import { DatePickerTextService } from "../doc.service";

@Component({
    selector: 'date-picker-basic',
    templateUrl: './demo.component.html'
})
export class DatePickerBasicDemoComponent {
    public date;

    constructor(public doc: DatePickerTextService) {
    }
}
