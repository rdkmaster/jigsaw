import { Component } from "@angular/core";
import { DatePickerTextService } from "../doc.service";

@Component({
    selector: 'date-picker-week-start',
    templateUrl: './demo.component.html',
    styles: [`
        .demo-container h4 {
            font-size: 20px;
            margin-bottom: 20px;
        }

        .demo-container p {
            font-size: 14px;
            margin: 10px 0 20px 0
        }
    `]
})
export class DatePickerWeekStartComponent {
    public date = "now";

    public dateChange($event) {
        console.log($event);
    }

    constructor(public doc: DatePickerTextService) {
    }
}
