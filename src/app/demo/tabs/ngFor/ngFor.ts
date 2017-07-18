/**
 * Created by 10177553 on 2017/3/29.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl:"ngFor.html"
})
export class JigsawTabsWithNgForComponent implements OnInit {

    constructor() { }

    tabDatas : Array<string>

    ngOnInit() {
        this.tabDatas = new Array("Tab1","Tab2")
    }

    testEvent() {
        console.info("tab页点击");
    }
}
