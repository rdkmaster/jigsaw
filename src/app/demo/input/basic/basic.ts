import {Component, ViewChild} from "@angular/core";
import {RdkInput} from "../../../../rdk/component/input/input";

@Component({
  templateUrl: 'basic.html'
})
export class InputBasicDemoComponent {
    // inputValue=10;
    valueChanged(message: string) {

        console.log(`input value is: ${message}`);
    }

    @ViewChild('myInput') myInput:RdkInput;
    click() {
        alert('你输入的值是 ' + this.myInput.value)
    }
}

