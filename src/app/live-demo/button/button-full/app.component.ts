import {Component, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class ButtonFullComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    // demo-5
    canClick() {
        alert('hello jigsaw button');
    }

    // demo-6
    disabled: boolean;
    clickCount: number = 0;
    changeClickCount() {
        this.clickCount++;
    }

    // demo-7
    isLoading = false;
    label: string = 'click to load';
    onClick() {
        this.isLoading = !this.isLoading;
        this.label = this.isLoading ? 'loading...' : 'click to load';
    }
}

