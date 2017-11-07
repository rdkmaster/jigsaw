import {Component} from "@angular/core";
import {DemoBase} from "app/demo-description/demo-base";

@Component({
    templateUrl: './app.component.html'
})
export class ButtonBasicDemoComponent extends DemoBase {
    onClick() {
        alert('hello jigsaw button');
    }
}

