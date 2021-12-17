import { Component } from '@angular/core';
import { JigsawToast } from 'jigsaw/public_api';

@Component({
    templateUrl: './demo.component.html',
    styles: ['./demo.component.css']
})
export class ToastBasicDemoComponent {
    show() {
        JigsawToast.show('消息')
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo介绍了Toast组件的基本用法';
    description: string = '';
}
