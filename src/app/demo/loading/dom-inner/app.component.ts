import {Component} from '@angular/core';

@Component({
    templateUrl: './app.component.html'
})
export class DomInnerDemoComponent {
    isLoading: boolean;

    load() {
        this.isLoading = !this.isLoading;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
