import {Component} from "@angular/core";

@Component({
  templateUrl: './demo.component.html'
})
export class NumericInputDisabledDemoComponent {
    value: number;

    disabled: boolean;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

