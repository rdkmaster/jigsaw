import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        jigsaw-icon {
            margin-right: 50px;
            line-height: 1;
        }
    `]
})

export class BadgeStatusDemoComponent {

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO详细演示了`jigsaw-badge`指令的各种状态';
    description: string = '';
}
