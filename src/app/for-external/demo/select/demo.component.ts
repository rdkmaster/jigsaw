import {Component} from "@angular/core";
import {SelectTextService} from "./doc.service";

@Component({
    templateUrl: "demo.component.html"
})
export class SelectDemoComponent {
    constructor(public doc: SelectTextService) {
    }
}
