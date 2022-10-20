import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html"
})
export class PopupDemoComponent extends DemoSetBase {
    public demoPath = "demo/popup";

}
