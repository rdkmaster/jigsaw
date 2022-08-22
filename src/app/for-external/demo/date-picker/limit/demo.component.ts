import { Component } from "@angular/core";
import { DatePickerTextService } from "../doc.service";

@Component({
    selector: 'limit-date-picker',
    templateUrl: './demo.component.html'
})
export class DatePickerLimitComponent {
    public date1 = "now";
    public limitStart = 'now-5d';
    public limitEnd = 'now+5d';
    
    constructor(public doc: DatePickerTextService) {
    }
}
