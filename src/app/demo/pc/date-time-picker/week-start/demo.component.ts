import {Component} from "@angular/core";
import {DateTimePickerTextService} from "../text.service";

@Component({
    selector: 'week-start-date-time-picker',
    templateUrl: './demo.component.html',
    styles: [`
        .header {
            font-size: 20px;
            margin-bottom: 20px;
        }

        .message {
            font-size: 14px;
            margin: 10px 0 20px 0
        }
    `]
})
export class DateTimePickerWeekStartComponent {
    date = "now";

    weekStart = ['mon'];
    janX = [4]

    dateChange($event) {
        console.log($event);
    }

    constructor(public text: DateTimePickerTextService) {
    }

}
