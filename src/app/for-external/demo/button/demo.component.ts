import {Component} from "@angular/core";
import {DemoSetBase} from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class ButtonAllComponent extends DemoSetBase {
    public demoPath = "demo/button";
}

