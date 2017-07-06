import {Component, ViewChild} from "@angular/core";
import {JigsawInput} from "jigsaw/component/input/input";

@Component({
  templateUrl: 'prefixIcon.html'
})
export class InputPrefixIconDemoComponent {

    @ViewChild('myInput') myInput:JigsawInput;
    click() {
        alert('你输入的值是 ' + this.myInput.value)
    }
}

