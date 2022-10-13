import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'icon-basic',
    templateUrl: './demo.component.html'
})
export class IconBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/icon/basic";

    public onClick() {
        alert('你戳到我啦');
    }
}
