import {Component, ViewChild} from '@angular/core';
import {JigsawTab} from "jigsaw/public_api";
import {TabTextService} from "../doc.service";

@Component({
    selector: 'tab-hide-show',
    templateUrl: "./demo.component.html"
})
export class JigsawHideShowTabComponent {

    @ViewChild('myTab') myTab: JigsawTab;

    hideTab1() {
        this.myTab.hideTab(0);
    }

    showTab1() {
        this.myTab.showTab(0);
    }

    hideTab2() {
        this.myTab.hideTab(1);
    }

    showTab2() {
        this.myTab.showTab(1);
    }

    constructor(public doc: TabTextService) {
    }
}
