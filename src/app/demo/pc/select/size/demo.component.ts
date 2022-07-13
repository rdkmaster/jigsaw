import {Component} from "@angular/core";
import {SelectTextService} from "../text.service";
import {ArrayCollection} from "../../../../../jigsaw/common/core/data/array-collection";

@Component({
    selector: "size-select",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class SelectSizeComponent {
    public selectedLabel = {label: "中", size: "medium"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"}
    ]);
    cityListForSelect = new ArrayCollection([
        {label: "北京"},
        {label: "这是一个上海的标题，非常长，非常长，非常长，非常长，非常长。。。。"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ]);
    constructor(public text: SelectTextService) {}

}
