import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'icon-similar-hyperlink',
    templateUrl: './demo.component.html'
})
export class IconSimilarHyperlinkComponent extends AsyncDescription {
    public demoPath = "demo/icon/similar-hyperlink";

    public onClick() {
        alert('你戳到我啦');
    }
}
