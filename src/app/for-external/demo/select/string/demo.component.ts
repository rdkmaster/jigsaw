import {Component} from "@angular/core";
import {SelectTextService} from "../doc.service";
import {ArrayCollection} from "jigsaw/public_api";

@Component({
    selector: "select-string",
    templateUrl: "demo.component.html"
})
export class SelectStringDemoComponent {
    public selectedLabel = {label: "中", size: "medium"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"}
    ]);
    selectedCityForSelect2: string;
    cityArrayList = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);

    selectedCityName: string;

    cityList3 = new ArrayCollection([
        {name: "北京", value: 'bj'},
        {name: "上海", value: 'sh'},
        {name: "南京", value: 'nj'},
        {name: "深圳", value: 'sz'},
        {name: "长沙", value: 'cs'},
        {name: "西安", value: 'xa'}
    ]);
    public selectChange2(selectedItem: any) {
        console.log("the select city is:", selectedItem);
        this.selectedCityForSelect2 = selectedItem;
    }
    constructor( public text: SelectTextService) {
    }
}
