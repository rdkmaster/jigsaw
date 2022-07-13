import {Component} from '@angular/core';
import {ButtonTextService} from "../text.service";


@Component({
    selector: 'icon-word-button',
    templateUrl: './demo.component.html',
    styleUrls: ['../public.css']
})
export class ButtonIconWordComponent {
    public selectedLabel = {label: "中", size: "default"};
    constructor(public text: ButtonTextService) {}
    onClick() {
        alert('Hello Jigsaw Button ^_^');
    }

}
