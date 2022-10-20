import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html",
})
export class CollapseDemoComponent extends DemoSetBase {
    public demoPath = "demo/collapse";
    public docPath = ['component/JigsawCollapse'];
}
