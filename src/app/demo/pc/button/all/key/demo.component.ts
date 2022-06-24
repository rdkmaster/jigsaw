import {Component, OnInit} from '@angular/core';
import {BttonTextService} from "../text.service";


@Component({
    selector: 'key-button',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css', '../demo.component.css']
})
export class ButtonKeyComponent {
    public selectedLabel = {label: "中", size: "default"};
    constructor(public text: BttonTextService) {}
}
