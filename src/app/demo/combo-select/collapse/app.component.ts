/**
 * Created by 10177553 on 2017/4/10.
 */
import {Component, Renderer2, ViewContainerRef} from '@angular/core';
@Component({
    templateUrl: './app.component.html'
})
export class CollapseBasicDemo{
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
}
