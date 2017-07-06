/**
 * Created by 10184437 on 2017/5/10.
 */
import { Component, ElementRef } from '@angular/core';

@Component({
    templateUrl: 'preset.html'
})

export class ButtonPresetDemoComponent {
    public size: string = "";
    public aSize: string = "";

    constructor(private elementRef: ElementRef) {}
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
