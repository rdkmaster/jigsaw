import { Component } from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class InputReadonlyDemoComponent {
    public inputValue: string;
    public inputValue2: string = '只读输入框';

    public readonly: boolean = true;
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
