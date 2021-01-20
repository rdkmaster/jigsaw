import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class TextareaMaxLengthDemoComponent {
    public _$isCalculateCrlf: boolean = true;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了多行文本框的 maxLength 的用法，包括统计时是否包含回车换行符';
    description: string = '';
}
