import {Component, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {JigsawTab, TranslateHelper} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TabsUpdateTitleDemoComponent {
    title = 'a short title';

    constructor(public translateService: TranslateService) {

    }

    changeLang() {
        TranslateHelper.changeLanguage(this.translateService,
            this.translateService.currentLang == 'zh' ? 'en' : 'zh');
    }

    changeTitle1() {
        this.title = this.title == 'a short title' ? 'a very very very very long title' : 'a short title';
    }

    @ViewChild('tabs')
    private _tabs: JigsawTab;

    changeTitle2(idx: number) {
        this._tabs.renameTab(idx, 'new title ' + Date.now());
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '此demo主要描述tab的title动态变化的处理方法，主要使用场景如语言切换等。';
    description: string = require('!!raw-loader!./readme.md').default;
}
