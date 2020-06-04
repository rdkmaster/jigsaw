import {Component, ViewChild} from '@angular/core';
import {JigsawTab} from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class JigsawHideTabComponent {

    @ViewChild('myTab', {static: false}) myTab: JigsawTab;

    hideTab() {
        this.myTab.hideTab(0);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
