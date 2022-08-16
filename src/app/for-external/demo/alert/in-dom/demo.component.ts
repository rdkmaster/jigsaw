import { Component } from "@angular/core";
import { AlertTextService } from "../doc.service";

@Component({
    selector: "alert-in-dom",
    templateUrl: "./demo.component.html",
    styles: [`
        .demo-container jigsaw-warning-alert,
        .demo-container jigsaw-confirm-alert {
            margin-left: 100px;
        }
    `]
})
export class AlertInDomDemoComponent {
    constructor(public text: AlertTextService) { }

    // ====================================================================
    // Ignore the following lines, they are not important to this demo.
    // ====================================================================
    codes = [
        { label: "HTML", language: 'html', value: require('!!raw-loader!./demo.component.html').default, },
        { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./demo.component.ts').default }
    ];
}
