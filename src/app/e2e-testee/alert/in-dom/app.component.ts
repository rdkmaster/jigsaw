import {Component, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
    template: `
        <jigsaw-info-alert [initData]="infoInitData"></jigsaw-info-alert>
    `
})
export class AlertInDomDemoComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
    infoInitData = {
        message: 'this is a great info alert!', title: 'the title is optional'
    };
}

