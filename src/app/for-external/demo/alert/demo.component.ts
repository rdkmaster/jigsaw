import { Component } from "@angular/core";
import { AlertTextService } from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class AlertDemoComponent {
    constructor(public doc: AlertTextService) { }
}

