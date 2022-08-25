import { Component } from '@angular/core';
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'combo-select-trigger',
    templateUrl: './demo.component.html',
    styles: [`
        .drop-down {
            font-size: 16px;
            background-color: #ddd;
            height: 100px;
            line-height: 100px;
            text-align: center;
        }
    `]
})
export class ComboSelectTriggerDemoComponent extends AsyncDescription {
    public demoPath = "demo/combo-select/trigger";

    public open: boolean = true;
}
