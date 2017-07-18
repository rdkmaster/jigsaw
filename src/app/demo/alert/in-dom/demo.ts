import {Component} from "@angular/core";

@Component({
    template: `
        <jigsaw-info-alert [initData]="infoInitData"></jigsaw-info-alert>
    `
})
export class AlertInDomDemoComponent {
    infoInitData = {
        message: 'this is a great info alert!', title: 'the title is optional'
    };
}

