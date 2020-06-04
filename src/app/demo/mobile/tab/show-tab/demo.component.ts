import {Component, ViewChild} from '@angular/core';
import {JigsawMobileTab} from "jigsaw/mobile_public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class JigsawShowTabComponent {

    @ViewChild('myTab', {static: false}) myTab: JigsawMobileTab;

    showTab() {
        this.myTab.showTab(1);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
