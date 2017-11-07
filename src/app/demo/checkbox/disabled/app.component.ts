import {Component} from "@angular/core";
import {CheckBoxStatus} from "jigsaw/component/checkbox/typings";
import {DemoBase} from "app/demo-description/demo-base";

@Component({
  templateUrl: './app.component.html'
})
export class CheckBoxDisableDemoComponent extends DemoBase {
    checked = CheckBoxStatus.unchecked;
    enabled: boolean;
}

