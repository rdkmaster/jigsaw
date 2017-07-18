import {Component} from "@angular/core";
import {CheckBoxStatus} from "jigsaw/component/checkbox/checkbox";

@Component({
  templateUrl: './app.component.html'
})
export class CheckBoxBasicDemoComponent {
    checked = CheckBoxStatus.unchecked;
    enableIndeterminate:boolean = false;

    // 第二个组件
    status = CheckBoxStatus.indeterminate;
    enableIndeterminate2: boolean = true;
}

