import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'numeric-input-show-option',
    templateUrl: "./demo.component.html"
})
export class NumericInputShowOptionDemoComponent extends AsyncDescription {
    public demoPath = "demo/numeric-input/show-option";
    public selectedSize = { size: "default" };

    public showOption: boolean = true;
    public value: number;
    public value2: number;
    public value3: number;
    public _$units = ["单位（GB）", "单位（MB）", "单位（KB）"];
}
