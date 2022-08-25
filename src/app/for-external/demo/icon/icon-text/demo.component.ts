import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'icon-icon-text',
    templateUrl: './demo.component.html'
})
export class IconIconTextDemoComponent extends AsyncDescription {
    public demoPath = "demo/icon/icon-text";

    public onClick() {
        alert('你戳到我啦');
    }
}
