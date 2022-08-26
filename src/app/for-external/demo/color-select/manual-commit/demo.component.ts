import {Component} from '@angular/core';
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'color-select-manual-commit',
    templateUrl: 'demo.component.html'
})

export class ColorSelectManualCommitDemoComponent extends AsyncDescription {
    public demoPath = "demo/color-select/manual-commit";
    public selectedSize = { size: "normal" };

    public _$colorChange(color: string) {
        console.log(color);
    }
}
