import {Component, ViewChild} from "@angular/core";
import {JigsawInput} from "jigsaw/public_api";
import {InputTextService} from "../text.service";

@Component({
    selector: 'focus-input',
    templateUrl: './demo.component.html'
})
export class InputFocusDemoComponent {
    inputValue: any;
    focusMessage: string;
    @ViewChild('myInput') myInput: JigsawInput;

    click() {
        this.myInput.focus();
    }

    focusHandler(event) {
        console.log(event);
        this.focusMessage = 'input component focused'
    }
    constructor(public text: InputTextService) {
    }
}
