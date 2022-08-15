import {Component} from '@angular/core';
import {ColorSelectTextService} from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: 'color-select-auto-commit',
    templateUrl: 'demo.component.html'
})

export class ColorSelectAutoCommitDemoComponent {
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "normal"},
        {label: "大", size: "large"}
    ]);
    public selectedLabel = {label: "中", size: "normal"};
    public _$colorChange(color: string) {
        console.log(color);
    }
    constructor(public text: ColorSelectTextService) {
    }
}
