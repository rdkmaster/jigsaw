import {Component, ViewChild} from "@angular/core";
import {RdkInput} from "../../../../rdk/component/input/input";

@Component({
  templateUrl: 'prefixIcon.html'
})
export class InputPrefixIconDemoComponent {

    @ViewChild('myInput') myInput:RdkInput;
    click() {
        alert('你输入的值是 ' + this.myInput.value)
    }
}

