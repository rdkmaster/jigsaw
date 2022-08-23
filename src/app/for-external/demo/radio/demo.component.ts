import { Component } from "@angular/core";
import { RadioTextService } from "./doc.service";
@Component({
    templateUrl: "demo.component.html"
})
export class RadioGroupDemoComponent {
    constructor(public doc: RadioTextService) {
    }
}
