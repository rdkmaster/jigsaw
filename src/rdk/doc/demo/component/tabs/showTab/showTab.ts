/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {RdkTab} from "../../../../../component/tabs/tab";

@Component({
    templateUrl:"showTab.html"
})
export class RdkShowTabComponent {

    @ViewChild('myTab') myTab: RdkTab;

    showTab() {
        this.myTab.showTab(1);
    }

}
