import { Component } from "@angular/core";
import { IconTextService } from "../doc.service";

@Component({
    selector: 'icon-status',
    templateUrl: './demo.component.html'
})
export class IconStatusDemoComponent {
    public fontSize = 12;

    constructor(public doc: IconTextService) {
    }
}
