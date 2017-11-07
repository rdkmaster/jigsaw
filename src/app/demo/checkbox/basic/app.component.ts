import {Component} from "@angular/core";
import {CheckBoxStatus} from "jigsaw/component/checkbox/typings";
import {DemoBase} from "app/demo-description/demo-base";

@Component({
    templateUrl: './app.component.html'
})
export class CheckBoxBasicDemoComponent extends DemoBase {
    checked = CheckBoxStatus.unchecked;
    enableIndeterminate: boolean = false;

    // 第二个组件
    status = CheckBoxStatus.indeterminate;
    enableIndeterminate2: boolean = true;
}

