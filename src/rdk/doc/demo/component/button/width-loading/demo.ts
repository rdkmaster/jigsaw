
import {Component} from "@angular/core";

@Component({
    template: `
        <rdk-button (click)="onClick()" type="primary" width="120px" height="32px">
            <rdk-loading *ngIf="isLoading" width="16px" height="16px" color="white"></rdk-loading>
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

