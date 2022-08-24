import { Component } from "@angular/core";
import { TextareaTextService } from "../doc.service";

@Component({
    selector: 'textarea-resize',
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class TextareaResizeDemoComponent {
    constructor(public doc: TextareaTextService) {
    }

}
