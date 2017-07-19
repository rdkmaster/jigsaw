import {Component, ViewChild, Renderer2, ViewContainerRef} from "@angular/core";
import {JigsawInput} from "jigsaw/component/input/input";

@Component({
  templateUrl: './app.component.html'
})
export class InputBasicDemoComponent {
    inputValue: any;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    valueChanged(message: string) {
        console.log(`input value is: ${message}`);
    }

    @ViewChild('myInput') myInput:JigsawInput;
    click() {
        alert('你输入的值是 ' + this.myInput.value)
    }
}

