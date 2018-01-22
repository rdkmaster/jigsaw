import {Component} from "@angular/core";
import {CheckBoxStatus} from "jigsaw/component/checkbox/typings";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

