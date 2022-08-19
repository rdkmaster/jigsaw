import {Component} from '@angular/core';
import {ComboSelectTextService} from "../doc.service";

@Component({
    selector: 'combo-select-set-width',
    templateUrl: './demo.component.html'
})
export class ComboSelectSetWidthDemoComponent {
    width: string = '200';
    width2: string = '400';

    constructor(public doc: ComboSelectTextService) {
    }

}
