import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html'
})

export class ColorSelectConfirmDemoComponent {

    public _$showConfirm: boolean;

    public _$colorChange(color: string) {
        console.log(color);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO详细演示了`jigsaw-color-select`组件的在颜色选中时，是否需要确认的效果';
    description: string = '';
}
