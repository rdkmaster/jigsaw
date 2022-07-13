import {Component} from '@angular/core';
import {ButtonTextService} from "../text.service";


@Component({
    selector: 'important-button',
    templateUrl: './demo.component.html',
    styleUrls: ['../public.css']
})
export class ButtonImportantComponent {
    public selectedLabel = {label: "中", size: "default"};
    constructor(public text: ButtonTextService) {}
}
