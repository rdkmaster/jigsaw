import {Component} from "@angular/core";
import {TimePickerTextService} from "./text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class TimePickerAllComponent {
    constructor(public text: TimePickerTextService) {}
}

