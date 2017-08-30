/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, ViewChild, Renderer2, ViewContainerRef} from '@angular/core';
import {JigsawTab} from "jigsaw/component/tabs/tab";

@Component({
    templateUrl:"./app.component.html"
})
export class JigsawHideTabComponent {

    @ViewChild('myTab') myTab: JigsawTab;

    hideTab() {
        this.myTab.hideTab(0);
    }
    
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
}
