import {Component} from '@angular/core';
import {BttonTextService} from "../text.service";


@Component({
    selector: 'common-button',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css', '../demo.component.css']
})
export class ButtonCommonComponent {
    public selectedLabel = {label: "中", size: "default"};
    constructor(public text: BttonTextService) {}
}
