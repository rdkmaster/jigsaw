import { Component } from "@angular/core";
import {DemoSetBase} from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class DrawerAllComponent extends DemoSetBase {
    public demoPath = "demo/drawer";
    public docPath = ['component/JigsawDrawer'];
}

