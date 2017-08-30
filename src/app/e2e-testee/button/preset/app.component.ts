/**
 * Created by 10184437 on 2017/5/10.
 */
import { Component, ElementRef, Renderer2, ViewContainerRef } from '@angular/core';

@Component({
    templateUrl: './app.component.html'
})

export class ButtonPresetDemoComponent {
    public size: string = "";
    public aSize: string = "";

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2,
                private elementRef: ElementRef) {}
    onClick() {
        alert('hello jigsaw button');
    }

    changeSize(type?: string) {
        this.size = type;
    }

    changeASize(type?: string) {
        this.aSize = type;
    }
}
