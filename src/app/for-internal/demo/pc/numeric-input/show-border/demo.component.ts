import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class NumericInputShowBorderDemoComponent {
    value: number;
    showBorder:boolean;

    valueChange($event) {
        console.log($event, typeof $event == "number");
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
