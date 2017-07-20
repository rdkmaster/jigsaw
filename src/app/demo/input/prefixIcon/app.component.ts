import {Component, ViewChild, Renderer2, ViewContainerRef} from "@angular/core";
import {JigsawInput} from "jigsaw/component/input/input";

@Component({
  templateUrl: './app.component.html'
})
export class InputPrefixIconDemoComponent {

    @ViewChild('myInput') myInput:JigsawInput;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
    
    click() {
        alert('你输入的值是 ' + this.myInput.value)
    }
}

