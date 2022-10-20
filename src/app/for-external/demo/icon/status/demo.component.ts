import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'icon-status',
    templateUrl: './demo.component.html'
})
export class IconStatusDemoComponent extends AsyncDescription {
    public demoPath = "demo/icon/status";

    public fontSize = 12;
}
