import { Component } from "@angular/core";
import { ComboSelectTextService } from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class ComboSelectComponent {
    constructor(public doc: ComboSelectTextService) { }
}

