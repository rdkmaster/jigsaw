import { Component } from "@angular/core";
import { IconTextService } from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class IconAllComponent {
    constructor(public doc: IconTextService) { }
}

