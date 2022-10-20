import { Component } from "@angular/core";
import { DemoSetBase } from "../../template/demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html"
})
export class DialogDemoComponent extends DemoSetBase {
    public demoPath = "demo/dialog";
    public docPath = ['component/JigsawDialog'];
}
