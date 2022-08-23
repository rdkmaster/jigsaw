import { Component } from "@angular/core";
import { BoxTextService } from "../doc.service";

@Component({
    selector: 'box-layout',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BoxLayoutDemoComponent {
    public arr = new Array(20);

    public resizeInfo: string;

    public handleResizeStart(box) {
        this.resizeInfo = 'Box is resizing';
    }

    public handleResize(box) {
        this.resizeInfo = `Box's width is changed to be ${box.element.offsetWidth} px.`;
    }

    constructor(public doc: BoxTextService) {
    }

}
