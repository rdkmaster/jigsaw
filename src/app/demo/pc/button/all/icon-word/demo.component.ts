import {Component} from '@angular/core';
import {BttonTextService} from "../text.service";


@Component({
    selector: 'icon-word-button',
    templateUrl: './demo.component.html',
    styleUrls: ['../demo.component.css']
})
export class ButtonIconWordComponent {
    public selectedLabel = {label: "中", size: "default"};
    constructor(public text: BttonTextService) {}
    onClick() {
        alert('Hello Jigsaw Button ^_^');
    }

}
