import {Component} from "@angular/core";
import {TrustedHtmlTextService} from "./doc.service";

@Component({
    templateUrl: 'demo.component.html'
})
export class TrustedHtmlDemoComponent {
    constructor( public text: TrustedHtmlTextService) {
    }
}
