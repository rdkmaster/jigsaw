import {Component} from "@angular/core";
import {DateTimePickerTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class DateTimePickerAllComponent {
    constructor(public doc: DateTimePickerTextService) {}
}

