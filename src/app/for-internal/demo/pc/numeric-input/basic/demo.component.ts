import {Component} from "@angular/core";

@Component({
    templateUrl: "./demo.component.html",
})
export class NumericInputBasicDemoComponent {
    value: number;

    valueChange($event) {
        console.log($event, typeof $event == "number");
    }

    public changeValue1() {
        this.value = undefined;
    }
    public changeValue2() {
        this.value = null;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
