import {Component} from "@angular/core";
import {DateTimePickerTextService} from "../text.service";

@Component({
    selector: 'valid-date-time-picker',
    templateUrl: './demo.component.html'
})
export class DateTimePickerValidDemoComponent {
    selected = ['invalid'];

    get valid(): boolean {
        return this.selected[0] == 'valid';
    }

    constructor(public text: DateTimePickerTextService) {
    }
}
