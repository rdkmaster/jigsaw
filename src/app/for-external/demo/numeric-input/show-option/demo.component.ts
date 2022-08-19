import { Component } from "@angular/core";
import { NumericInputTextService } from "../doc.service";

@Component({
    selector: 'numeric-input-show-option',
    templateUrl: "./demo.component.html"
})
export class NumericInputShowOptionDemoComponent {
    public selectedLabel = { label: "中", size: "default" };
    showOption: boolean = true;
    value: number;
    value2: number;
    value3: number;
    public _$units = ["单位（GB）", "单位（MB）", "单位（KB）"];

    constructor(public doc: NumericInputTextService) {
    }
}
