import { Component } from "@angular/core";
import { DemoSetBase } from "../../demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html"
})
export class ToastDemoComponent extends DemoSetBase {
    public demoPath = "demo/toast";
    public docPath = ['component/JigsawToast'];
}
