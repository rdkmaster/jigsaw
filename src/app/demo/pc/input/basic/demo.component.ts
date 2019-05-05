import {Component, ViewChild} from "@angular/core";
import {JigsawInput} from "jigsaw/pc-components/input/input";

@Component({
  templateUrl: './demo.component.html'
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawInput.value',
        'JigsawInput.placeholder',
    ];
}

