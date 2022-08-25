import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'box-middle-resize-line',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BoxMiddleResizeLineDemoComponent extends AsyncDescription {
    public demoPath = "demo/box/middle-resize-line";

}
