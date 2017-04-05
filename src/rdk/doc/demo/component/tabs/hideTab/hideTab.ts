/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {RdkTabs} from "../../../../../component/tabs/tabs";

@Component({
    templateUrl:"hideTab.html"
})
export class RdkHideTabComponent implements OnInit {

    @ViewChild('myTab') myTab: RdkTabs;

    hideTab() {
        this.myTab.hideTab(0);
    }

    constructor() { }

    ngOnInit() { }

}
