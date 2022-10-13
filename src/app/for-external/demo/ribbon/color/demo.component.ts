import { Component } from '@angular/core';
import { AsyncDescription } from "../../../demo-template/demo-template";

@Component({
    selector: 'ribbon-color',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class RibbonColorDemoComponent extends AsyncDescription {
    public demoPath = "demo/ribbon/color";
    public selectedSize = { size: "normal" };
}
