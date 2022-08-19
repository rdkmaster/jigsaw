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
    constructor(public doc: AlertTextService) { }
}
