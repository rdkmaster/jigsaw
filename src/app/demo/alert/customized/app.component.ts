import {Component, ViewEncapsulation, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
    template: `
        <my-alert></my-alert>
    `,
    encapsulation: ViewEncapsulation.None
})
export class CustomizeAlertDemoComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
}

