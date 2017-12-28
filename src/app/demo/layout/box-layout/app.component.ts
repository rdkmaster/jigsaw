import {Component} from "@angular/core";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class BoxLayoutDemoComponent {

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用box布局页面';
    description: string = require('!!raw-loader!./readme.md');
}


