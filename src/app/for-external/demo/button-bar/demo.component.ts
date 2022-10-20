import { Component } from "@angular/core";
import {DemoSetBase} from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class ButtonBarAllComponent extends DemoSetBase {
    public demoPath = "demo/button-bar";
    public docPath = ['component/JigsawButtonBar'];
}
