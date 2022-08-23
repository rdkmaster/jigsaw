import { Component, ViewChild } from '@angular/core';
import { JigsawTab } from "jigsaw/public_api";
import { TabTextService } from "../doc.service";

@Component({
    selector: 'tab-hide-show',
    templateUrl: "./demo.component.html"
})
export class JigsawHideShowTabComponent {
    @ViewChild('myTab') myTab: JigsawTab;

    public hideTab1() {
        this.myTab.hideTab(0);
    }

    public showTab1() {
        this.myTab.showTab(0);
    }

    public hideTab2() {
        this.myTab.hideTab(1);
    }

    public showTab2() {
        this.myTab.showTab(1);
    }

    constructor(public doc: TabTextService) {
    }
}
