import {Component} from '@angular/core';
import {ButtonTextService} from "../doc.service";
import {ArrayCollection} from "jigsaw/public_api";


@Component({
    selector: 'button-icon-text',
    templateUrl: './demo.component.html'
})
export class ButtonIconTextComponent {
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"},
        {label: "默认", size: "default"}
    ]);
    public selectedLabel = {label: "默认", size: "default"};
    constructor(public text: ButtonTextService) {}
    onClick() {
        alert('Hello Jigsaw Button ^_^');
    }

}
