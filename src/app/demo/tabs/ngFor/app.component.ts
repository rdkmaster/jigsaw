/**
 * Created by 10177553 on 2017/3/29.
 */
import {
	Component, OnInit, Renderer2, ViewContainerRef
} from '@angular/core';

@Component({
    templateUrl:"./app.component.html"
})
export class JigsawTabsWithNgForComponent implements OnInit {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    tabDatas : Array<string>

    ngOnInit() {
        this.tabDatas = new Array("Tab1","Tab2")
    }

    testEvent() {
        console.info("tab页点击");
    }
}
