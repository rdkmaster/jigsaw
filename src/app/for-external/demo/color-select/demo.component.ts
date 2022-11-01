import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: 'demo.component.html',
})
export class ColorSelectDemoComponent extends DemoSetBase {
    public demoPath = "demo/color-select";
    public docPath = ['component/JigsawColorSelect'];
}
