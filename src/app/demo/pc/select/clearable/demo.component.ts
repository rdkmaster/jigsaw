import {Component} from "@angular/core";
import {SelectTextService} from "../text.service";
import {ArrayCollection} from "../../../../../jigsaw/common/core/data/array-collection";

@Component({
    selector: "clearable-select",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class SelectClearableComponent {
    public selectedLabel = {label: "中", size: "medium"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"}
    ]);
    selectedCityForSelect: string;
    cityList = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);

    public selectChange(selectedItem: any) {
        console.log("select city is: " + selectedItem);
    }

    constructor(public text: SelectTextService) {}

}
