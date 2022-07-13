import {Component} from "@angular/core";
import {InputTextService} from "../text.service";

@Component({
    selector: 'clearable-input',
    templateUrl: './demo.component.html'
})
export class InputClearableDemoComponent {
    enabled: boolean;
    constructor(public text: InputTextService) {
    }
}
