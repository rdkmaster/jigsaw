/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {RdkTabs} from "../../../../../component/tabs/tabs";

@Component({
    templateUrl:"destoryTab.html"
})
export class RdkDestoryTabComponent {

    @ViewChild('myTab') myTab: RdkTabs;

    destroyTab() {
        this.myTab.destroyTab(0);
    }

}
