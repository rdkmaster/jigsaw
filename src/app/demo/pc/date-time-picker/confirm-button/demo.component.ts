import {Component} from "@angular/core";
import {DateTimePickerTextService} from "../text.service";

@Component({
    selector: 'confirm-button-date-time-picker',
    templateUrl: './demo.component.html',
    styles: [`
        .live-demo-wrap p {
            font-size: 14px;
            margin: 10px 0 20px 0
        }

        .condition {
            display: flex;
            align-items: center;
            margin: 10px;
        }

        .condition label {
            margin-right: 10px;
            margin-bottom: 0;
        }

        .block {
            display: inline-block;
            margin-right: 30px;
        }
    `]
})
export class DateTimePickerConfirmButtonDemoComponent {
    showConfirmButton = true;
    gr = ['date'];
    date1 = 'now';
    date2 = 'now';
    date3 = {beginDate: 'now-1d', endDate: 'now'};
    beginDate = "now-1d";
    endDate = "now";

    constructor(public text: DateTimePickerTextService) {
    }
}
