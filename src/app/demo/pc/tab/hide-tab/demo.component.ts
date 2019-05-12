/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, ViewChild} from '@angular/core';
import {JigsawTab} from "jigsaw/pc-components/tabs/tab";

@Component({
    templateUrl: "./demo.component.html"
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
    tags: string[] = [
        'JigsawTab.hideTab',
    ];
}
