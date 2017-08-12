
import {Component, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
    template: `
        <jigsaw-button (click)="onClick()" colorType="primary" height="32px">
            <jigsaw-loading *ngIf="isLoading" width="16px" height="16px" color="white"></jigsaw-loading>
            <span style="padding-left: 5px">{{label}}</span>
        </jigsaw-button>
    `
})
export class ButtonWithLoadingComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
    isLoading = false;
    label: string = 'click to load';
    onClick() {
        this.isLoading = !this.isLoading;
        this.label = this.isLoading ? 'loading...' : 'click to load';
    }
}

