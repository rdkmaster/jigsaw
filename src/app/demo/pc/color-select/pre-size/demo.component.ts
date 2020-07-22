import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html'
})

export class ColorSelectPreSizeDemoComponent {
    public _$limitedColors = ['#ba1621', '#e43232', '#e57409', '#ffa940', '#f7d216'];
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO详细演示了`jigsaw-color-select`组件的各个参数的效果以及推荐的用法';
    description: string = '';
}
