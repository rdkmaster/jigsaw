import {Component} from '@angular/core';
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'color-select-remove-transparency',
    templateUrl: 'demo.component.html'
})

export class ColorSelectRemoveTransparencyDemoComponent extends AsyncDescription {
    public demoPath = "demo/color-select/remove-transparency";
    public selectedSize = { size: "normal" };

    public _$colorChange(color: string) {
        console.log(color);
    }
}
