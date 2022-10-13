import { Component } from '@angular/core';
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'combo-select-drop-down-status',
    templateUrl: './demo.component.html'
})
export class ComboDropDownStatusDemoComponent extends AsyncDescription {
    public demoPath = "demo/combo-select/drop-down-status";

    public name: string = 'Jigsaw';
}
