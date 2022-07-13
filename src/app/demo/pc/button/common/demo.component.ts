import {Component} from '@angular/core';
import {ButtonTextService} from "../text.service";


@Component({
    selector: 'common-button',
    templateUrl: './demo.component.html',
    styleUrls: ['../public.css']
})
export class ButtonCommonComponent {
    public selectedLabel = {label: "中", size: "default"};
    constructor(public text: ButtonTextService) {}
}
