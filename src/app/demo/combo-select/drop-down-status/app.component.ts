/**
 * Created by 10177553 on 2017/4/10.
 */
import {Component} from '@angular/core';

@Component({
    templateUrl: './app.component.html'
})
export class ComboDropDownStatusDemoComponent {
    name: string = 'Jigsaw';

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '下拉视图的状态 - 请关注这个demo的下拉视图的各个组件的值的变化';
    description: string = require('!!raw-loader!./readme.md');
}
