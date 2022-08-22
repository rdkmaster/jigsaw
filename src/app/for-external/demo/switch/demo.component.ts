import {Component} from "@angular/core";
import {SwitchTextService} from "./doc.service";

@Component({
    templateUrl: "demo.component.html"
})
export class SwitchDemoComponent {
    constructor( public doc: SwitchTextService) {
    }
}
