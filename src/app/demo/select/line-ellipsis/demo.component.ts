import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html',
})
export class SelectLineEllipsisDemoComponent {
    selectedCityForSelect: any;
    cityListForSelect = new ArrayCollection([
        {label: "北京"},
        {label: "这是一个上海的标题，非常长，非常长，非常长，非常长，非常长。。。。"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ]);

    selectedCityName: string;

    selectChange(selectedItem: any) {
        this.selectedCityName = selectedItem.label;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

