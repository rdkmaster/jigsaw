/**
 * Created by 10177553 on 2017/4/26.
 */
import { Component, OnInit, Renderer2, ViewContainerRef } from '@angular/core';

@Component({
    templateUrl: './app.component.html'
})
export class CollapseBasicDemoComponent implements OnInit {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    ngOnInit() { }

}
