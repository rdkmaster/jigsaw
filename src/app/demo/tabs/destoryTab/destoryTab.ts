/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, ViewChild} from '@angular/core';
import {JigsawTab} from "jigsaw/component/tabs/tab";

@Component({
    templateUrl:"destoryTab.html"
})
export class JigsawDestoryTabComponent {

    @ViewChild('myTab') myTab: JigsawTab;

    destroyTab() {
        this.myTab.removeTab(0);
    }

}
