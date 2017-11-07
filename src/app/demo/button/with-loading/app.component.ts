import {Component} from "@angular/core";
import {DemoBase} from "app/demo-description/demo-base";

@Component({
    templateUrl: './app.component.html'
})
export class ButtonWithLoadingComponent extends DemoBase {
    isLoading = false;
    label: string = 'click to load';

    onClick() {
        this.isLoading = !this.isLoading;
        this.label = this.isLoading ? 'loading...' : 'click to load';
    }
}

