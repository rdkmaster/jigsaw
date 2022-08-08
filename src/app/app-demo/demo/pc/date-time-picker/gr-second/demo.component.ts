import {Component} from "@angular/core";
import {DateTimePickerTextService} from "../doc.service";

@Component({
    selector: 'date-time-picker-gr-second',
    templateUrl: './demo.component.html'
})
export class DateTimePickerGrSecondComponent {
    date = "now";

    dateChange($event) {
        console.log($event);
    }

    constructor(public text: DateTimePickerTextService) {
    }

}
