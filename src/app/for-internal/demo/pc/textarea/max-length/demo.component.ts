import {Component, ViewChild} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class TextareaMaxLengthDemoComponent {
    public _$includesCRLF: boolean = true;
    public _$value = '多行文本框';

    public _$valueChange($event: string): void {
        console.log(' input value: ', $event);
    }

    public selectedSystem: "windows" | "linux" | "unset" = "unset";
    systems = ["windows" , "linux" , "unset"];

    maxLength: number = 100;

    radioChange($event: string) {
        console.log("selected System is", $event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了多行文本框的 maxLength 的用法，包括统计时是否包含回车换行符';
    description: string = '';
}
