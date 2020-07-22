import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html'
})

export class ColorSelectModeDemoComponent {
    public _$colorChange(color: string) {
        console.log(color);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO详细演示了`jigsaw-color-select`组件的两种不同选择颜色的模式';
    description: string = '';
}
