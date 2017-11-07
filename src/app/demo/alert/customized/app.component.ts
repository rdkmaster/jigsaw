import {Component, ViewEncapsulation} from "@angular/core";
import {DemoBase} from "app/demo-description/demo-base";

@Component({
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CustomizeAlertDemoComponent extends DemoBase {
}

