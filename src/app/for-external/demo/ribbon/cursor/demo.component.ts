import { Component } from '@angular/core';
import { AsyncDescription } from "../../../template/demo-template/demo-template";

@Component({
    selector: 'ribbon-cursor',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class RibbonCursorDemoComponent extends AsyncDescription {
    public demoPath = "demo/ribbon/cursor";
    public selectedSize = { size: "normal" };
}
