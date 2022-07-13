import {Component} from "@angular/core";
import {SelectTextService} from "../text.service";
import {ArrayCollection} from "../../../../../jigsaw/common/core/data/array-collection";

@Component({
    selector: "basic-select",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class SelectBasicComponent {
    public selectedLabel = {label: "中", size: "medium"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"}
    ]);
    selectedCityForSelect: any;
    cityList = new ArrayCollection([
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
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
    selectedCityForSelect3 = this.cityList3[0];
    labelField = 'name';
    selectedCityName3: string;

    public changeLabelField() {
        const last = this.labelField;
        this.labelField = 'name' + (+new Date);
        this.cityList3.forEach(item => {
            item[this.labelField] = item[last];
            delete item[last];
        });
        this.cityList3.refresh();
        console.log('the new label field is:', this.labelField);
    }

    public selectChange(selectedItem: any) {
        console.log("the select city is:", selectedItem.label);
        this.selectedCityName = selectedItem.label;
    }

    public selectChange2(selectedItem: any) {
        console.log("the select city is:", selectedItem);
        this.selectedCityForSelect2 = selectedItem;
    }

    public selectChange3(selectedItem: any) {
        console.log("select city is:", selectedItem);
        this.selectedCityName3 = selectedItem.name;
    }
    constructor(public text: SelectTextService) {}

}
