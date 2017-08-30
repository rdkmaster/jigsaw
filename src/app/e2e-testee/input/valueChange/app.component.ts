import {Component, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
  templateUrl: './app.component.html'
})
export class InputValueChangeDemoComponent {
    inputValue: any;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
    
    valueChanged(message: string) {
        console.log(`input value is: ${message}`);
    }
}

