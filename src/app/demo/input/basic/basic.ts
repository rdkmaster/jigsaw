import {Component, ViewChild} from "@angular/core";
import {JigsawInput} from "jigsaw/component/input/input";

@Component({
  templateUrl: 'basic.html'
})
export class InputBasicDemoComponent {
    inputValue: any;
    valueChanged(message: string) {

        console.log(`input value is: ${message}`);
    }

    @ViewChild('myInput') myInput:JigsawInput;
    click() {
        alert('你输入的值是 ' + this.myInput.value)
    }
}

