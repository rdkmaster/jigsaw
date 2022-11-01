import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";
@Component({
    templateUrl: "demo.component.html"
})
export class RadioGroupDemoComponent extends DemoSetBase {
    public demoPath = "demo/radio";
    public docPath = ['component/JigsawRadioGroup'];
}
