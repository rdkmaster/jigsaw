import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html'
})
export class ComboDropDownStatusDemoComponent {
    name: string = 'Jigsaw';

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '下拉视图的状态 - 请关注这个demo的下拉视图的各个组件的值的变化';
    description: string = require('!!raw-loader!./readme.md').default;
}
