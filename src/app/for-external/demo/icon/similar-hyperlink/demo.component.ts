import { Component } from "@angular/core";
import { IconTextService } from "../doc.service";

@Component({
    selector: 'icon-similar-hyperlink',
    templateUrl: './demo.component.html'
})
export class IconSimilarHyperlinkComponent {
    public onClick() {
        alert('你戳到我啦');
    }

    constructor(public doc: IconTextService) {
    }
}
