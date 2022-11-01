import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html"
})
export class SwitchDemoComponent extends DemoSetBase {
    public demoPath = "demo/switch";
    public docPath = ['component/JigsawSwitch'];
}
