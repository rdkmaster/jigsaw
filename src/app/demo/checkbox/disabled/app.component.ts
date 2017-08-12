import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {CheckBoxStatus} from "jigsaw/component/checkbox/typings";

@Component({
  templateUrl: './app.component.html'
})
export class CheckBoxDisableDemoComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    checked = CheckBoxStatus.unchecked;
    enabled: boolean;
}

