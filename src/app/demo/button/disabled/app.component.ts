import {Component} from "@angular/core";
import {DemoBase} from "app/demo-description/demo-base";

@Component({
    templateUrl: './app.component.html'
})
export class ButtonDisableDemoComponent extends DemoBase {
    disabled: boolean;
    clickCount: number = 0;
    click() {
        //alert('nothing happened!')
        this.clickCount++;
    }
}

