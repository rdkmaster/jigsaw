import {Component} from '@angular/core';
import {ButtonTextService} from "../text.service";


@Component({
    selector: 'key-button',
    templateUrl: './demo.component.html',
    styleUrls: ['../public.css']
})
export class ButtonKeyComponent {
    public selectedLabel = {label: "中", size: "default"};
    constructor(public text: ButtonTextService) {}
}
