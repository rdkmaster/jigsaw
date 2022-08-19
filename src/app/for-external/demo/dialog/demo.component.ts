import {Component} from "@angular/core";
import {DialogTextService} from "./doc.service";

@Component({
    templateUrl: "demo.component.html"
})
export class DialogDemoComponent {
    constructor(public doc: DialogTextService) {
    }
}
