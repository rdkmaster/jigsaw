import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'drawer-in-drawer',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerInDrawerDemoComponent extends AsyncDescription {
    public demoPath = "demo/drawer/drawer-in-drawer";

}
