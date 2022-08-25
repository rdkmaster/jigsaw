import { Component } from '@angular/core';
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'color-select-auto-commit',
    templateUrl: 'demo.component.html'
})

export class ColorSelectAutoCommitDemoComponent extends AsyncDescription {
    public demoPath = "demo/color-select/auto-commit";

    public _$colorChange(color: string) {
        console.log(color);
    }

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "normal" },
        { label: "大", size: "large" }
    ]);
    public selectedSize = { label: "中", size: "normal" };
}
