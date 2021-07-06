import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .live-demo-wrap jigsaw-icon {
            margin: 10px;
            line-height: 1;
        }
    `]
})
export class BadgeSizeDemoComponent {

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO详细演示了`jigsaw-badge`指令的各种尺寸';
    description: string = '';
}
