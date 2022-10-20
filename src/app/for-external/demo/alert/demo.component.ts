import { Component } from "@angular/core";
import { DemoSetBase } from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class AlertDemoComponent extends DemoSetBase {
    demoPath = 'demo/alert';
    docPath = ['component/JigsawAlert'];
}