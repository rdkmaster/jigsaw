import {Component, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
    templateUrl: './app.component.html'
})
export class ButtonDisableDemoComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
    disabled: boolean;
    clickCount: number = 0;
    click() {
        //alert('nothing happened!')
        this.clickCount++;
    }
}

