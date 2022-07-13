import {Component} from "@angular/core";
import {DatePickerTextService} from "../text.service";

@Component({
    selector: 'week-start-date-picker',
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
    date = "now";

    weekStart = ['mon'];
    janX = [4];

    dateChange($event) {
        console.log($event);
    }

    constructor(public text: DatePickerTextService) {
    }
}
