import { Component } from "@angular/core";
import { DateTimePickerTextService } from "../doc.service";

@Component({
    selector: 'date-time-picker-confirm-button',
    templateUrl: './demo.component.html'
})
export class DateTimePickerConfirmButtonDemoComponent {
    public showConfirmButton = true;
    public date1 = 'now';
    public date2 = 'now';
    public date3 = { beginDate: 'now-1d', endDate: 'now' };
    public beginDate = "now-1d";
    public endDate = "now";

    constructor(public doc: DateTimePickerTextService) {
    }
}
