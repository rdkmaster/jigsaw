import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html'
})
export class SliderDemoComponent extends DemoSetBase {
    public demoPath = "demo/slider";
    public docPath = ['component/JigsawSlider'];
}

