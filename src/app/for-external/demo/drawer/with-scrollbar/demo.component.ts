import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'drawer-with-scrollbar',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerWithScrollbarDemoComponent extends AsyncDescription {
    public demoPath = "demo/drawer/with-scrollbar";

}
