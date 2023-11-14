import { Component } from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class NumericInputDefaultValueDemoComponent {
    public value: number;
    public defaultValue = 0;

    public valueChange($event) {
        console.log($event, typeof $event == "number");
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
