import { Component } from "@angular/core";
import { DemoSetBase } from "../../demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html"
})
export class CheckBoxDemoComponent extends DemoSetBase {
    public demoPath = 'demo/checkbox';
    public docPath = ['component/JigsawCheckBox'];
}
