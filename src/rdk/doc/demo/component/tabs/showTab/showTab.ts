/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {RdkTabs} from "../../../../../component/tabs/tabs";

@Component({
    templateUrl:"showTab.html"
})
export class RdkShowTabComponent {

    @ViewChild('myTab') myTab: RdkTabs;

    showTab() {
        this.myTab.showTab(1);
    }

}
