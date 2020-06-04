import {Component, ViewChild} from '@angular/core';
import {JigsawTab} from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class JigsawDestoryTabComponent {
    @ViewChild('myTab', {static: false}) myTab: JigsawTab;

    destroyTab() {
        this.myTab.removeTab(0);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
