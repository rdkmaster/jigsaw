import {Component} from "@angular/core";
import {CheckBoxStatus} from "jigsaw/component/checkbox/typings";

@Component({
  templateUrl: './app.component.html'
})
export class CheckBoxDisableDemoComponent {
    checked = CheckBoxStatus.unchecked;
    enabled: boolean;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

