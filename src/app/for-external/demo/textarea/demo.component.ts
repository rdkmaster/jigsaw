import {Component} from "@angular/core";
import {TextareaTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class TextareaAllComponent {
    constructor(public doc: TextareaTextService) {}
}

