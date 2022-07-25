import {Component} from "@angular/core";
import {DatePickerTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class DatePickerAllComponent {
    constructor(public text: DatePickerTextService) {}
}

