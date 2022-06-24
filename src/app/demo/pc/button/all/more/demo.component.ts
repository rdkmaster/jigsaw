import {Component} from '@angular/core';
import {BttonTextService} from "../text.service";


@Component({
    selector: 'more-button',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css', '../demo.component.css']
})
export class ButtonMoreComponent {
    public selectedLabel = {label: "中", size: "default"};
    constructor(public text: BttonTextService) {}

    onClick() {
        alert('Hello Jigsaw Button ^_^');
    }

}
