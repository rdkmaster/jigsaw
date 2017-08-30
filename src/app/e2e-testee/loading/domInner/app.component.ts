import {Component, Renderer2, ViewContainerRef} from '@angular/core';

@Component({
    templateUrl: './app.component.html'
})
export class DomInnerDemoComponent {
    isLoading: boolean;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    load(){
        this.isLoading = !this.isLoading;
    }
}
