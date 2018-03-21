import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TabsUpdateTitleDemoComponent {
    title = 'a short title';

    changeTitle() {
        this.title = this.title == 'a short title' ? 'a looooooooooooooooooooooong title' : 'a short title';
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '此demo主要描述tab的title动态变化的处理方法，主要使用场景如语言切换等。';
    description: string = require('!!raw-loader!./readme.md');
}
