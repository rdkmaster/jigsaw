import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'icon-position',
    templateUrl: './demo.component.html'
})
export class IconPositionDemoComponent extends AsyncDescription {
    public demoPath = "demo/icon/position";

    public onClick() {
        alert('你戳到我啦');
    }
}
