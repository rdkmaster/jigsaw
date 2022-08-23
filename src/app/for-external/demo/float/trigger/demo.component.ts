import { Component } from '@angular/core';
import { FloatTextService } from "../doc.service";

@Component({
    selector: 'float-trigger',
    templateUrl: './demo.component.html'
})
export class FloatTriggerDemoComponent {
    public closeTrigger = "mouseleave";
    public openTrigger: string = "mouseenter";
    public openTrigger1 = "click";
    public closeTrigger1 = "click";
    public openTrigger2 = "none";
    public closeTrigger2 = "none";

    public open: boolean = false;
    public open1: boolean = false;
    public open2: boolean = false;

    public openFloat() {
        this.open2 = true;
    }
    public closeFloat() {
        this.open2 = false;
    }

    constructor(public doc: FloatTextService) {
    }
}
