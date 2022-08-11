import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
})
export class SelectOptionWidthDemoComponent {
    optionWidth = 400;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个Demo演示了通过optionWidth属性来使得下拉列表的宽度变大的效果';
    description: string = '';
}
