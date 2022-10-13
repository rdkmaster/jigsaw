import { Component } from "@angular/core";
import {DemoSetBase} from "../../demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html"
})
export class ProcessStatusDemoComponent extends DemoSetBase {
    public demoPath = "demo/process-status";

}
