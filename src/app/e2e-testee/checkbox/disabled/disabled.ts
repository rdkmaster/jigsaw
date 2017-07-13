import {Component} from "@angular/core";
import {CheckBoxStatus} from "../../../../jigsaw/component/checkbox/checkbox";

@Component({
  templateUrl: 'disabled.html'
})
export class CheckBoxDisableDemoComponent {
    checked = CheckBoxStatus.unchecked;
    enabled: boolean;
}

