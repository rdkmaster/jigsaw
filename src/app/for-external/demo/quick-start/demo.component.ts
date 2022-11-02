import { Component } from "@angular/core";
import { DemoSetBase } from "../../template/demo-template/demo-template";

@Component({
    templateUrl: 'demo.component.html',
})
export class QuickStartDemoComponent extends DemoSetBase {
    public demoPath = "demo/quick-start";
}
