import { Component } from '@angular/core';
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'color-select-auto-commit',
    templateUrl: 'demo.component.html'
})

export class ColorSelectAutoCommitDemoComponent extends AsyncDescription {
    public demoPath = "demo/color-select/auto-commit";
    public selectedSize = { size: "normal" };

    public _$colorChange(color: string) {
        console.log(color);
    }
}
