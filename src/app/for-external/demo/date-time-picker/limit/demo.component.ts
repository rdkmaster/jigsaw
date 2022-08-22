import { Component } from "@angular/core";
import { DateTimePickerTextService } from "../doc.service";

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
    public showConfirmButton = true;
    public date1 = "now";
    public limitStart = 'now-5d';
    public limitEnd = 'now+5d';

    constructor(public doc: DateTimePickerTextService) {
    }
}
