import { Component } from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})

export class BadgeCircleDemoComponent {
    public select($event) {
        console.log('badge click: ', $event);
    }

    public _$btn() {
        console.log('host click');
    }


    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO详细演示了`jigsaw-badge`指令角标加背景色的用法和效果，注意区分深浅色';
    description: string = '';
}
