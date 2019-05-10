/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: "./demo.component.html"
})
export class JigsawMobileTabsWithNgForComponent implements OnInit {
    tabDatas: Array<string>;

    ngOnInit() {
        this.tabDatas = ["Tab1", "Tab2"]
    }

    testEvent() {
        console.info("tab页点击");
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawMobileTab',
    ];
}
