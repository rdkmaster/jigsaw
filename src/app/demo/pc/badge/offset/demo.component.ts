import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html'
})

export class BadgeOffsetDemoComponent {
    hOffset1 = 0;
    hOffset2 = -10;
    goods = [
        'bicycle', 'camera', 'car', 'football', 'book', 'puzzle-piece',
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO详细演示了`jigsaw-badge`指令的各个位置的用法';
    description: string = '';
}
