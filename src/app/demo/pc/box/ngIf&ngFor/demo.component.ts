import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BoxNgIfNgForDemoComponent {
    arr = new Array(20);

    resizeInfo: string;

    showBox = true;

    handleResizeStart(box) {
        this.resizeInfo = 'Box is resizing';
    }

    handleResize(box) {
        this.resizeInfo = `Box's width is changed to be ${box.element.offsetWidth} px.`;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了在box上使用ngIf和NgFor';
    description: string = '';
}
