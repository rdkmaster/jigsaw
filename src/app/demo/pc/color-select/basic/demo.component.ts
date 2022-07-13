import {Component} from '@angular/core';
import {ColorSelectTextService} from "../text.service";
import {ArrayCollection} from "../../../../../jigsaw/common/core/data/array-collection";

@Component({
    selector: 'basic-color-select',
    templateUrl: './demo.component.html'
})

export class ColorSelectBasicDemoComponent {
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "normal"},
        {label: "大", size: "large"}
    ]);
    public selectedLabel = {label: "中", size: "normal"};
    constructor(public text: ColorSelectTextService) {
    }
}
