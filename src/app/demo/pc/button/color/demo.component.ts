import {Component} from '@angular/core';
import {ButtonTextService} from "../text.service";

@Component({
    selector: 'set-color-button',
    templateUrl: './demo.component.html',
})

export class ButtonColorDemoComponent {
    public selectedLabel = {label: "中", size: "default"};
    constructor(public text: ButtonTextService) {}
}
