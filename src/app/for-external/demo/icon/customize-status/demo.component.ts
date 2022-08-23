import { Component } from "@angular/core";
import { IconTextService } from "../doc.service";

@Component({
    selector: 'icon-customize-status',
    templateUrl: './demo.component.html'
})
export class IconCustomizeStatusDemoComponent {
    public fontSize = 12;

    constructor(public doc: IconTextService) {
    }
}
