import {Component, ViewChild} from "@angular/core";
import {RdkInput} from "../../../../../component/input/input";

@Component({
  templateUrl: 'focus.html'
})
export class InputFocusDemoComponent {

    @ViewChild('myInput') myInput:RdkInput;
    click() {
        this.myInput.focus();
    }

    focusHandler(event){
        console.log(event);
    }

}

