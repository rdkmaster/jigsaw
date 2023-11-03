import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class TextareaMaxLengthDemoComponent {
    public _$includesCRLF: boolean = true;
    public _$value = '多行文本框';
    public _$value1 = '包含多种风格换行符的文本 \n line1 \r\n line2 \n line3 \r\n line4';
    public valueWithLineBreak = '';
    public selectedLineBreakStyle: "windows" | "linux" = "linux";
    public lineBreakStyles = ["windows" , "linux"];

    constructor() {
        this.lineBreakChange();
    }

    public _$valueChange($event: string): void {
        console.log(' input value: ', $event);
    }

    lineBreakChange() {
        this.valueWithLineBreak = this._$value1.replace(/\r/g, '\\r').replace(/\n/g, '\\n');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了多行文本框的 maxLength 的用法，包括统计时是否包含回车换行符';
    description: string = '';
}
