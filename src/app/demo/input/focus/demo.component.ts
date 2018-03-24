import {Component, ViewChild} from "@angular/core";
import {JigsawInput} from "jigsaw/component/input/input";

@Component({
    templateUrl: './demo.component.html'
})
export class InputFocusDemoComponent {
    inputValue: any;
    focusMessage: string;
    @ViewChild('myInput') myInput: JigsawInput;

    click() {
        alert(this.myInput.select());
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
    tags: string[] = [
        'JigsawInput.focus',
    ];
}

