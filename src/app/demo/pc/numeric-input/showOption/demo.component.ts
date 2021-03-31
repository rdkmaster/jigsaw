import { Component } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.scss"]
})
export class NumericInputShowOptionDemoComponent {
    value: number;
    value2: number;
    value3: number;
    value4: number;
    public _$units = ["单位（GB）", "单位（MB）", "单位（KB）"];
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
