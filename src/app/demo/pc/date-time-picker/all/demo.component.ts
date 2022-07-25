import {Component} from "@angular/core";
import {DateTimePickerTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class DateTimePickerAllComponent {
    constructor(public text: DateTimePickerTextService) {}
}

