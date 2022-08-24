import { Component } from "@angular/core";
import { TextareaTextService } from "../doc.service";

@Component({
    selector: 'textarea-select',
    templateUrl: './demo.component.html'
})
export class TextareaSelectDemoComponent {
    public select: boolean = true;

    constructor(public doc: TextareaTextService) {
    }

}
