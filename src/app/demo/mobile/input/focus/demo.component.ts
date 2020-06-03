import {Component, ViewChild} from "@angular/core";
import {JigsawMobileInput} from "jigsaw/mobile_public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class InputFocusDemoComponent {
    inputValue: any;
    focusMessage: string;
    @ViewChild('myInput') myInput: JigsawMobileInput;

    click() {
        this.myInput.focus();
    }

    focusHandler(event) {
        console.log(event);
        this.focusMessage = 'input component focused'
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
