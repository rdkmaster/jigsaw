
import {Component} from "@angular/core";

@Component({
    template: `
        <rdk-button (click)="onClick()" colortype="primary" width="120px">
            <rdk-loading *ngIf="isLoading" width="14px" height="14px" color="blue"></rdk-loading>
            <span style="padding-left: 5px">{{label}}</span>
        </rdk-button>
    `
})
export class ButtonWithLoadingComponent {
    isLoading = false;
    label: string = 'click to load';
    onClick() {
        this.isLoading = !this.isLoading;
        this.label = this.isLoading ? 'loading...' : 'click to load';
    }
}

