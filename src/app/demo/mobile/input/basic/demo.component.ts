import {Component, ViewChild} from "@angular/core";
import {JigsawMobileInput} from "jigsaw/mobile-components/input/input";

@Component({
    templateUrl: './demo.component.html'
})
export class InputBasicDemoComponent {
    inputValue: any;

    valueChanged(message: string) {
        console.log(`input value is: ${message}`);
    }

    @ViewChild('myInput', {static: false}) myInput: JigsawMobileInput;

    click() {
        alert('你输入的值是 ' + this.myInput.value)
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawMobileInput.value',
        'JigsawMobileInput.placeholder',
    ];
}

