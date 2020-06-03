import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: "./demo.component.html"
})
export class JigsawTabsWithNgForComponent implements OnInit {
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
}
