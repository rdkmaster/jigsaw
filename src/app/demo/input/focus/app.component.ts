import {Component, ViewChild, Renderer2, ViewContainerRef} from "@angular/core";
import {JigsawInput} from "jigsaw/component/input/input";

@Component({
  templateUrl: './app.component.html'
})
export class InputFocusDemoComponent {
    inputValue: any;
    focusMessage: string;
    @ViewChild('myInput') myInput:JigsawInput;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
    
    click() {
        this.myInput.focus();
    }

    focusHandler(event){
        console.log(event);
        this.focusMessage = 'input component focused'
    }

}

