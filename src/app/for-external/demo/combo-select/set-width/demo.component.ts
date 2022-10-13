import {Component} from '@angular/core';
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'combo-select-set-width',
    templateUrl: './demo.component.html'
})
export class ComboSelectSetWidthDemoComponent extends AsyncDescription {
    public demoPath = "demo/combo-select/set-width";

    width: string = '200';
}
