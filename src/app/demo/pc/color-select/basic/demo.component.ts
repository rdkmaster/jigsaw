import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html'
})

export class ColorSelectBasicDemoComponent {
    public _$color: string = "#dddddd"

    public _$colorDisabledOpacity: string = "#dddddd"

    public _$colorChange($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO详细演示了`jigsaw-color-select`组件的各个参数的效果以及推荐的用法';
    description: string = '';
}
