import {Component} from "@angular/core";
import {DemoBase} from "app/demo-description/demo-base";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class ButtonFullComponent extends DemoBase {

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

