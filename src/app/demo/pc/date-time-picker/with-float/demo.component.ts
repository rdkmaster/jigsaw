import {Component} from "@angular/core";
import {DateTimePickerTextService} from "../text.service";

@Component({
    selector: 'with-float-date-time-picker',
    templateUrl: './demo.component.html'
})
export class WithFloatDemoComponent {
    constructor(public text: DateTimePickerTextService) {
    }
}
