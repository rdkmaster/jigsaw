import {Component, ViewChild} from "@angular/core";
import {JigsawInput} from "jigsaw/component/input/input";

@Component({
  templateUrl: 'focus.html'
})
export class InputFocusDemoComponent {
    inputValue: any;
    @ViewChild('myInput') myInput:JigsawInput;
    click() {
        this.myInput.focus();
    }

    focusHandler(event){
        console.log(event);
    }

}

