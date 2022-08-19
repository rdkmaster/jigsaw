import {Component} from "@angular/core";
import {CheckboxTextService} from "./doc.service";

@Component({
    templateUrl: "demo.component.html"
})
export class CheckBoxDemoComponent {
    constructor(public doc: CheckboxTextService) {
    }
}
