import { Component } from "@angular/core";
import { IconTextService } from "../doc.service";

@Component({
    selector: 'icon-icon-text',
    templateUrl: './demo.component.html'
})
export class IconIconTextDemoComponent {
    public onClick() {
        alert('你戳到我啦');
    }

    constructor(public doc: IconTextService) {
    }
}
