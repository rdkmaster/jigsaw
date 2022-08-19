import {Component} from "@angular/core";
import {SelectTextService} from "../doc.service";
import {
    ArrayCollection
} from "jigsaw/public_api";

@Component({
    selector: "select-searchable",
    templateUrl: "./demo.component.html"
})

export class SelectSearchableDemoComponent {
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

    cityDataTemp = this.cityListForSelect.concat();

    selectedCityName: string;

    public selectChange(selectedItem: any) {
        selectedItem = selectedItem ? selectedItem : {label: ''};
        console.log("select city is:" + selectedItem.label);
        this.selectedCityName = selectedItem.label;
    }

    changeData() {
        this.cityListForSelect.fromArray(this.cityDataTemp.map((city, idx) => {
            if(city && city.label) {
                city = Object.assign({}, city);
                city.label = idx % 2 == 0 ? city.label + '-1' : city.label;
            }
            return city
        }));
    }

    constructor( public doc: SelectTextService) {
    }
}
