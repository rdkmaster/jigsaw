import { Component, ViewChild } from '@angular/core';
import { JigsawTab } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'tab-hide-show',
    templateUrl: "./demo.component.html"
})
export class JigsawHideShowTabComponent extends AsyncDescription {
    public demoPath = "demo/tab/hide-show";

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
}
