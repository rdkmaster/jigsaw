import {Component} from "@angular/core";
import {CollapseTextService} from "./doc.service";

@Component({
    templateUrl: "demo.component.html",
})
export class CollapseDemoComponent {
    constructor(public doc: CollapseTextService) {
    }
}
