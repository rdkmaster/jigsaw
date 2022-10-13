import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'box-layout',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BoxLayoutDemoComponent extends AsyncDescription {
    public demoPath = "demo/box/layout";

    public arr = new Array(20);

    public resizeInfo: string;

    public handleResizeStart(box) {
        this.resizeInfo = 'Box is resizing';
    }

    public handleResize(box) {
        this.resizeInfo = `Box's width is changed to be ${box.element.offsetWidth} px.`;
    }
}
