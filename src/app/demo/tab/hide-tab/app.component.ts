/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, ViewChild} from '@angular/core';
import {JigsawTab} from "jigsaw/component/tabs/tab";

@Component({
    templateUrl: "./app.component.html"
})
export class JigsawHideTabComponent {

    @ViewChild('myTab') myTab: JigsawTab;

    hideTab() {
        this.myTab.hideTab(0);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
