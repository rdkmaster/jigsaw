import { Component, AfterViewInit } from "@angular/core";
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
export class AlertInDomDemoComponent implements AfterViewInit {
    constructor(public text: AlertTextService) { }
    description: string;
    // description: string = require('!!raw-loader!./demo.component.ts').default;

    ngAfterViewInit(){
        try {
            this.description =  require('!!raw-loader!./demo.component.ts').default;
        } catch (error) {
            console.log(error)
        }
        console.log(this.description)
    }
}
