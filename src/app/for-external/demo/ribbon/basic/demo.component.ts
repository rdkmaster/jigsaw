import { Component } from '@angular/core';
import { AsyncDescription } from "../../../demo-template/demo-template";

@Component({
    selector: 'ribbon-basic',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class RibbonBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/ribbon/basic";
    public selectedSize = { size: "normal" };

}
