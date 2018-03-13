import {Component} from "@angular/core";
import {CheckBoxStatus} from "jigsaw/component/checkbox/typings";

@Component({
    templateUrl: './demo.component.html'
})
export class CheckBoxBasicDemoComponent {
    checked = CheckBoxStatus.unchecked;
    enableIndeterminate: boolean = false;

    // 第二个组件
    status = CheckBoxStatus.indeterminate;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了`JigsawCheckBox`的基本用法以及如何使用它的中间状态';
    description: string = '';
    tags: string[] = [
        'JigsawCheckBox.checked', 'JigsawCheckBox.enableIndeterminate',
    ];
}

