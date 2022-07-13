import {Component} from "@angular/core";
import {DateTimePickerTextService} from "../text.service";

@Component({
    selector: 'limit-date-time-picker',
    templateUrl: './demo.component.html',
    styles: [`
        .live-demo-wrap p {
            font-size: 14px;
            margin: 10px 0 20px 0
        }
    `]
})
export class DateTimePickerLimitComponent {
    showConfirmButton = false;
    date1 = "now";
    limitStartList = ['now-1d', 'now-5d', 'now-10d'];
    limitEndList = ['now', 'now+5d', 'now+10d'];
    limitStart = 'now-10d';
    limitEnd = 'now+5d';

    constructor(public text: DateTimePickerTextService) {
    }
}
