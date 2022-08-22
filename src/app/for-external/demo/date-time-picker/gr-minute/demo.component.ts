import { Component } from "@angular/core";
import { DateTimePickerTextService } from "../doc.service";

@Component({
    selector: 'date-time-picker-gr-minute',
    templateUrl: './demo.component.html'
})
export class DateTimePickerGrMinuteComponent {
    public date = "now";

    public dateChange($event) {
        console.log($event);
    }

    constructor(public doc: DateTimePickerTextService) {
    }

}
