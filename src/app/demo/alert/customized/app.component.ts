import {Component, ViewEncapsulation, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
    template: `
        <div style="width: 400px"><my-alert></my-alert></div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class CustomizeAlertDemoComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
}

