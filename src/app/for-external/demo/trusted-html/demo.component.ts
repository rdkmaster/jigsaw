import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: 'demo.component.html'
})
export class TrustedHtmlDemoComponent extends DemoSetBase {
    public demoPath = "demo/trusted-html";
    public docPath = ['class/TrustedHtmlHelper'];
}
