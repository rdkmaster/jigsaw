import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'drawer-with-tab',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerWithTabDemoComponent extends AsyncDescription {
    public demoPath = "demo/drawer/with-tab";

}
