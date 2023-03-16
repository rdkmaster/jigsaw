import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class NumericInputBasicDemoComponent {
    value: number;

    valueChange($event) {
        console.log($event, typeof $event == "number");
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
