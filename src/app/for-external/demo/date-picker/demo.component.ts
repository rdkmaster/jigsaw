import {Component} from "@angular/core";
import {DatePickerTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class DatePickerAllComponent {
    constructor(public doc: DatePickerTextService) {}
}

