import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BoxLayoutDemoComponent {
    arr = new Array(20);

    resizeInfo: string;

    handleResizeStart(box) {
        this.resizeInfo = 'Box is resizing';
    }

    handleResize(box) {
        this.resizeInfo = `Box's width is changed to be ${box.element.offsetWidth} px.`;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用box来布局一个比较复杂的页面';
    description: string = require('!!raw-loader!./readme.md');
    tags: string[] = [
        'JigsawBox.direction',
        'JigsawBox.resizable',
        'JigsawBox.resizeStart',
        'JigsawBox.resize',
        'JigsawBox.width',
        'JigsawBox.height',
    ];
}


