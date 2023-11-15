import { Component } from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class NumericInputDefaultValueDemoComponent {
    public value: number;
    public min = -10;
    public max = 110;
    public notANumber = NaN;
    public defaultValueStr = "";

    public get defaultValue() {
        const num = parseInt(this.defaultValueStr);
        return isNaN(num) ? undefined : num;
    };

    public valueChange($event) {
        console.log($event, typeof $event == "number");
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
