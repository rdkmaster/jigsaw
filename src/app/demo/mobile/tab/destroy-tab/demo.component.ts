import {Component, ViewChild} from '@angular/core';
import {JigsawMobileTab} from "jigsaw/mobile_public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class JigsawDestoryTabComponent {
    @ViewChild('myTab') myTab: JigsawMobileTab;

    destroyTab() {
        this.myTab.removeTab(0);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
