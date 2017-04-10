/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {RdkTab} from "../../../../../component/tabs/tab";

@Component({
    templateUrl:"hideTab.html"
})
export class RdkHideTabComponent implements OnInit {

    @ViewChild('myTab') myTab: RdkTab;

    hideTab() {
        this.myTab.hideTab(0);
    }

    constructor() { }

    ngOnInit() { }

}
