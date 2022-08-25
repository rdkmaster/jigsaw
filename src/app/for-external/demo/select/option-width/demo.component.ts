import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "select-option-width",
    templateUrl: "./demo.component.html"
})

export class SelectOptionWidthDemoComponent extends AsyncDescription {
    public demoPath = "demo/select/option-width";

    public optionWidth = 400;

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "medium" },
        { label: "大", size: "large" }
    ]);
    public selectedSize = { label: "中", size: "medium" };
}
