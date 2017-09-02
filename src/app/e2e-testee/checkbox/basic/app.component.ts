import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {CheckBoxStatus} from "jigsaw/component/checkbox/typings";

@Component({
  templateUrl: './app.component.html'
})
export class CheckBoxBasicDemoComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    checked = CheckBoxStatus.unchecked;
    enableIndeterminate:boolean = false;

    // 第二个组件
    status = CheckBoxStatus.indeterminate;
    enableIndeterminate2: boolean = true;
}

