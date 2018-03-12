import {Component, ViewChild} from '@angular/core';
import {JigsawTab} from "jigsaw/component/tabs/tab";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TabsUpdateTitleDemoComponent {
    title1 = 'a short title';

    changeTitle(tabs: JigsawTab) {
        this.title1 = this.title1 == 'a short title' ? 'a looooooooooooooooooooooong title' : 'a short title';
        tabs.updateTitle();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '此demo主要描述tab的title动态变化的处理方法，主要使用场景如语言切换等。';
    description: string = require('!!raw-loader!./readme.md');
}
