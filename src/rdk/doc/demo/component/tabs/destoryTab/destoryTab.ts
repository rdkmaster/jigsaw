/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {RdkTab} from "../../../../../component/tabs/tab";

@Component({
    templateUrl:"destoryTab.html"
})
export class RdkDestoryTabComponent {

    @ViewChild('myTab') myTab: RdkTab;

    destroyTab() {
        this.myTab.destroyTabPane(0);
    }

}
