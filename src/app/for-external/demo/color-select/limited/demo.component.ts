import {Component} from '@angular/core';
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'color-select-limited',
    templateUrl: 'demo.component.html'
})

export class ColorSelectLimitedDemoComponent extends AsyncDescription {
    public demoPath = "demo/color-select/limited";
    public selectedSize = { size: "normal" };

    public _$colorChange(color: string) {
        console.log(color);
    }

}
