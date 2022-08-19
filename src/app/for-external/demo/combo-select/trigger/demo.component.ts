import {Component} from '@angular/core';
import {ComboSelectTextService} from "../doc.service";

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
export class ComboSelectTriggerDemoComponent {
    public open: boolean = true;

    constructor(public doc: ComboSelectTextService) {
    }
}
