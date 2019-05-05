import {Component} from "@angular/core";
import {CheckBoxStatus} from "jigsaw/pc-components/checkbox/typings";

@Component({
  templateUrl: './demo.component.html'
})
export class CheckBoxDisableDemoComponent {
    checked = CheckBoxStatus.unchecked;
    enabled: boolean;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了如何使用`JigsawCheckBox`的disabled属性';
    description: string = '';
    tags: string[] = [
        'JigsawCheckBox.disabled'
    ];
}

