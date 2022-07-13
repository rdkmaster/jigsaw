import {Component} from '@angular/core';
import {ColorSelectTextService} from "../text.service";
import {ArrayCollection} from "../../../../../jigsaw/common/core/data/array-collection";

@Component({
    selector: 'mode-color-select',
    templateUrl: './demo.component.html'
})

export class ColorSelectModeDemoComponent {
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
