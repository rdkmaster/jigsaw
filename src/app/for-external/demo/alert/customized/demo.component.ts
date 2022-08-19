import {Component, ViewEncapsulation} from "@angular/core";
import { AlertTextService } from "../doc.service";

@Component({
    selector: 'alert-customized',
    templateUrl: './demo.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CustomizeAlertDemoComponent {
    constructor(public doc: AlertTextService) { }
}
