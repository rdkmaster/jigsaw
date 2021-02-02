import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html'
})

export class BadgePositionDemoComponent {

    goodsList = [
        {
            logo: 'bicycle',
            name: 'bicycle',
        },
        {
            logo: 'camera',
            name: 'camera',
        },
        {
            logo: 'car',
            name: 'car',
        },
        {
            logo: 'futbol-o',
            name: 'football',
        },
        {
            logo: 'book',
            name: 'book',
        },
        {
            logo: 'puzzle-piece',
            name: 'puzzle-piece',
        }
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO详细演示了`jigsaw-badge`指令的各个位置的用法';
    description: string = '';
}
