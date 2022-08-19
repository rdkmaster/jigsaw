import { Component } from "@angular/core";
import { AdjustFontColorTextService } from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class AdjustFontColorAllDemoComponent {
    constructor(public doc: AdjustFontColorTextService) { }
}

