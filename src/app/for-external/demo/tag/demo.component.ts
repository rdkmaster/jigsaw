import { Component } from "@angular/core";
import { DemoSetBase } from "../../demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html"
})
export class TagDemoComponent extends DemoSetBase {
    public demoPath = "demo/tag";
    public docPath = ['component/JigsawTag'];
}
