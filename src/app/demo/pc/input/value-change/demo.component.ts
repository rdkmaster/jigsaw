import {Component} from "@angular/core";
import {InputTextService} from "../text.service";

@Component({
    selector: 'value-change-input',
    templateUrl: './demo.component.html'
})
export class InputValueChangeDemoComponent {
    inputValue: any;

    valueChanged(message: string) {
        console.log(`input value is: ${message}`);
    }
    constructor(public text: InputTextService) {
    }
}
