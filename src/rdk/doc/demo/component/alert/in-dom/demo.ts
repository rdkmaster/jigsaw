import {Component} from "@angular/core";

@Component({
    template: `
        <rdk-info-alert [initData]="infoInitData"></rdk-info-alert>
    `
})
export class AlertInDomDemoComponent {
    infoInitData = {
        message: 'this is a great info alert!', title: 'the title is optional'
    };
}

