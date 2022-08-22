import {Component} from "@angular/core";
import {SelectTextService} from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: "select-line-ellipsis",
    templateUrl: "./demo.component.html"
})

export class SelectLineEllipsisDemoComponent {
    public selectedSize = {label: "中", size: "medium"};
    public sizes: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"}
    ]);
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
    constructor(public doc: SelectTextService) {}
}
