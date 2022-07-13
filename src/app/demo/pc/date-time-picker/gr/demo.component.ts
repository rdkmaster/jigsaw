import {Component} from "@angular/core";
import {DateTimePickerTextService} from "../text.service";

@Component({
    selector: 'gr-date-time-picker',
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
export class DateTimePickerGrComponent {
    date = "now";

    gr = ['date'];

    dateChange($event) {
        console.log($event);
    }

    constructor(public text: DateTimePickerTextService) {
    }

}
