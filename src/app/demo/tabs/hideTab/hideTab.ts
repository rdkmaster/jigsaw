/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {JigsawTab} from "jigsaw/component/tabs/tab";

@Component({
    templateUrl:"hideTab.html"
})
export class JigsawHideTabComponent implements OnInit {

    @ViewChild('myTab') myTab: JigsawTab;

    hideTab() {
        this.myTab.hideTab(0);
    }

    constructor() { }

    ngOnInit() { }

}
