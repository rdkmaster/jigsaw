import { Component } from "@angular/core";
import { DemoSetBase } from "../../template/demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html"
})
export class SelectDemoComponent extends DemoSetBase {
    public demoPath = "demo/select";
    public docPath = ['component/JigsawSelect'];
}
