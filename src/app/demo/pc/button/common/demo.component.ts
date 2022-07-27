import {Component} from '@angular/core';
import {ButtonTextService} from "../doc.service";
import {ArrayCollection} from "../../../../../jigsaw/common/core/data/array-collection";


@Component({
    selector: 'button-common',
    templateUrl: './demo.component.html'
})
export class ButtonCommonComponent {
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"},
        {label: "默认", size: "default"}
    ]);
    public selectedLabel = {label: "默认", size: "default"};
    constructor(public text: ButtonTextService) {}
}
