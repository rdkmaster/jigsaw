import { Component } from '@angular/core';
import { ComboSelectTextService } from "../doc.service";

@Component({
    selector: 'combo-select-drop-down-status',
    templateUrl: './demo.component.html'
})
export class ComboDropDownStatusDemoComponent {
    public name: string = 'Jigsaw';

    constructor(public doc: ComboSelectTextService) {
    }
}
