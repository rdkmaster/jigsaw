import {Component, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
    template: `
        <jigsaw-info-alert message="this is a great info alert!" caption="this is the title"></jigsaw-info-alert>
        <jigsaw-warning-alert message="this is a great warn alert!" caption="this is the title"></jigsaw-warning-alert>
        <br><br>
        <jigsaw-error-alert message="this is a great error alert!" caption="this is the title"></jigsaw-error-alert>
        <jigsaw-confirm-alert message="this is a great confirm alert!" caption="this is the title"></jigsaw-confirm-alert>
    `
})
export class AlertInDomDemoComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
}

