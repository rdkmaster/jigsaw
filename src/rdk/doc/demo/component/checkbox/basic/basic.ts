import {Component} from "@angular/core";
import {CheckBoxStatus} from "../../../../../component/checkbox/checkbox";

@Component({
  templateUrl: 'basic.html'
})
export class CheckBoxBasicDemoComponent {
    enableIndeterminate:boolean = false;

    // 第二个组件
    status = CheckBoxStatus.indeterminate;
    enableIndeterminate2: boolean = true;
}

