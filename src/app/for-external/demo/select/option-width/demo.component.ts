import { Component } from "@angular/core";
import { SelectTextService } from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: "select-option-width",
    templateUrl: "./demo.component.html"
})

export class SelectOptionWidthDemoComponent {
    public optionWidth = 400;

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "medium" },
        { label: "大", size: "large" }
    ]);
    public selectedSize = { label: "中", size: "medium" };
    constructor(public doc: SelectTextService) { }

}
