import {Component, ViewChild} from '@angular/core';
import {JigsawMobileTab} from "jigsaw/mobile_public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class JigsawHideTabComponent {

    @ViewChild('myTab', {static: false}) myTab: JigsawMobileTab;

    hideTab() {
        this.myTab.hideTab(0);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
