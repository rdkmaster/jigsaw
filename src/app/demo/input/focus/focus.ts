import {Component, ViewChild} from "@angular/core";
import {RdkInput} from "../../../../rdk/component/input/input";

@Component({
  templateUrl: 'focus.html'
})
export class InputFocusDemoComponent {
    inputValue: any;
    @ViewChild('myInput') myInput:RdkInput;
    click() {
        this.myInput.focus();
    }

    focusHandler(event){
        console.log(event);
    }

}

