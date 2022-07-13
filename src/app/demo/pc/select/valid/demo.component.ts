import {Component} from "@angular/core";
import {SelectTextService} from "../text.service";
import {ArrayCollection} from "../../../../../jigsaw/common/core/data/array-collection";

@Component({
    selector: "valid-select",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class SelectValidComponent {
    public selectedLabel = {label: "中", size: "medium"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"}
    ]);
    cityList = new ArrayCollection([
        { label: "北京" },
        { label: "上海" },
        { label: "南京" },
        { label: "深圳" },
        { label: "长沙" },
        { label: "西安" }
    ]);

    valid: false;

    public selectChange(selectedItem: any) {
        console.log("the select city is:", selectedItem.label);
    }
    constructor(public text: SelectTextService) {}

}
