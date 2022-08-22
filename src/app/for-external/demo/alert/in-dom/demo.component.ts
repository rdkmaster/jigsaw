import { Component } from "@angular/core";
import { AlertTextService } from "../doc.service";

@Component({
    selector: "alert-in-dom",
    templateUrl: "./demo.component.html",
    styles: ["./demo.component.css"]
})
export class AlertInDomDemoComponent {
    constructor(public doc: AlertTextService) { }
}
