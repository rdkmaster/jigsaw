import {Component, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
    templateUrl: './app.component.html'
})
export class ButtonWidthHeightDemoComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
}

