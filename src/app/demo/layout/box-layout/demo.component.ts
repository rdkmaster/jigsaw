import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BoxLayoutDemoComponent {
    arr = new Array(20);

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用box来布局一个比较复杂的页面';
    description: string = require('!!raw-loader!./readme.md');
}


