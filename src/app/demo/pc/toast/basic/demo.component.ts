import { Component } from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styles: ['./demo.component.css']
})
export class ToastBasicDemoComponent {
    showWithOptions() {
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo介绍了通知提醒框的4种基础类型：';
    description: string = '';
}
