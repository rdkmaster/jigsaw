import {Component} from "@angular/core";
import {DateTimePickerTextService} from "../doc.service";

@Component({
    selector: 'time-picker-limit-date',
    templateUrl: './demo.component.html',
    styles: [`
        .live-demo-wrap p {
            font-size: 14px;
            margin: 10px 0 20px 0
        }
    `]
})
export class DateTimePickerLimitComponent {
    showConfirmButton = true;
    date1 = "now";
    limitStart = 'now-5d';
    limitEnd = 'now+5d';

    constructor(public doc: DateTimePickerTextService) {
    }
}
