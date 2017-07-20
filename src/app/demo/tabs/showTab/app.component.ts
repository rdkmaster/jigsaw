/**
 * Created by 10177553 on 2017/3/29.
 */
import {
	Component, ViewChild, Renderer2, ViewContainerRef
} from '@angular/core';
import {JigsawTab} from "jigsaw/component/tabs/tab";

@Component({
    templateUrl:"./app.component.html"
})
export class JigsawShowTabComponent {

    @ViewChild('myTab') myTab: JigsawTab;

    showTab() {
        this.myTab.showTab(1);
    }

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
}
