import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'icon-customize-status',
    templateUrl: './demo.component.html'
})
export class IconCustomizeStatusDemoComponent extends AsyncDescription {
    public demoPath = "demo/icon/customize-status";

    public fontSize = 12;
}
