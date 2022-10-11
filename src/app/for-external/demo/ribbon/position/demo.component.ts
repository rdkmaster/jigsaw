import { Component } from '@angular/core';
import { AsyncDescription } from "../../../demo-template/demo-template";

@Component({
    selector: 'ribbon-position',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class RibbonPositionDemoComponent extends AsyncDescription {
    public demoPath = "demo/ribbon/position";
    public selectedSize = { size: "normal" };
}
