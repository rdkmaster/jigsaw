/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, ViewChild} from '@angular/core';
import {JigsawTab} from "jigsaw/component/tabs/tab";

@Component({
    templateUrl:"showTab.html"
})
export class JigsawShowTabComponent {

    @ViewChild('myTab') myTab: JigsawTab;

    showTab() {
        this.myTab.showTab(1);
    }

}
