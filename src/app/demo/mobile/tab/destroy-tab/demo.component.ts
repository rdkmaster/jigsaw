/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, ViewChild} from '@angular/core';
import {JigsawMobileTab} from "jigsaw/mobile-components/tabs/tab";

@Component({
    templateUrl: "./demo.component.html"
})
export class JigsawDestoryTabComponent {
    @ViewChild('myTab') myTab: JigsawMobileTab;

    destroyTab() {
        this.myTab.removeTab(0);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawMobileTab.removeTab',
    ];
}
