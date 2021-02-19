import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        jigsaw-icon {
            margin-right: 50px;
        }
    `]
})

export class BadgeStyleDemoComponent {
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO演示了`jigsaw-badge`指令的三种样式的使用方法。';
    description: string = '';
}
