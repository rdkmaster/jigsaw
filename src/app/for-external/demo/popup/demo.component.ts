import {Component} from "@angular/core";
import {PopupTextService} from "./doc.service";

@Component({
    templateUrl: "demo.component.html"
})
export class PopupDemoComponent {
    constructor( public doc: PopupTextService) {
    }
}
