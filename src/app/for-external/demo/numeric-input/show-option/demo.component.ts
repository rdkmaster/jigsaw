import { Component } from "@angular/core";
import { NumericInputTextService } from "../doc.service";

@Component({
    selector: 'numeric-input-show-option',
    templateUrl: "./demo.component.html"
})
export class NumericInputShowOptionDemoComponent {
    public selectedSize = { label: "中", size: "default" };
    public showOption: boolean = true;
    public value: number;
    public value2: number;
    public value3: number;
    public _$units = ["单位（GB）", "单位（MB）", "单位（KB）"];

    constructor(public doc: NumericInputTextService) {
    }
}
