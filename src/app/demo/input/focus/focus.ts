import {Component, ViewChild} from "@angular/core";
import {JigsawInput} from "jigsaw/component/input/input";

@Component({
  templateUrl: 'focus.html'
})
export class InputFocusDemoComponent {
    inputValue: any;
    focusMessage: string;
    @ViewChild('myInput') myInput:JigsawInput;
    click() {
        this.myInput.focus();
    }

    focusHandler(event){
        console.log(event);
        this.focusMessage = 'input component focused'
    }

}

