import { Component } from "@angular/core";
import {DemoSetBase} from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class BoxAllComponent extends DemoSetBase {
    public demoPath = "demo/box";
    public docPath = ['component/JigsawBox'];
}

