import {Component} from "@angular/core";
import {SelectTextService} from "../text.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: "option-count-select",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class SelectOptionCountComponent {
    public selectedLabel = {label: "中", size: "medium"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"}
    ]);
    selectedCityForSelect: any;
    cityListForSelect = new ArrayCollection([
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ]);

    selectedCityName: string;

    public selectChange(selectedItem:any){
        this.selectedCityName = selectedItem.label;
    }
    constructor(public text: SelectTextService) {}

}
