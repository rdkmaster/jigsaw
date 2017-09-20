import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {CheckBoxStatus} from "jigsaw/component/checkbox/typings";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class CheckBoxFullComponent {
    //demo-1
    demo1Checked = CheckBoxStatus.unchecked;
    enableIndeterminate: boolean = false;

    //demo-2
    demo2Checked = CheckBoxStatus.indeterminate;

    //demo-3
    demo3Checked = CheckBoxStatus.unchecked;
    enabled: boolean;
}

