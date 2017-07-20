import {Component, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
    templateUrl: './app.component.html'
})
export class ButtonBasicDemoComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
    onClick() {
        alert('hello jigsaw button');
    }
}

