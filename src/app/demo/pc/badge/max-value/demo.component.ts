import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        jigsaw-icon {
            margin-bottom: 10px;
            line-height: 1;
        }
    `]
})

export class BadgeMaxValueDemoComponent {
    public count: number = 99;
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO详细演示了`jigsaw-badge`指令在输入大于的最大数字限制时如何显示';
    description: string = '';
}
