import {Component} from "@angular/core";
import {SelectTextService} from "../text.service";
import {ArrayCollection} from "../../../../../jigsaw/common/core/data/array-collection";

@Component({
    selector: "Preset-select",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class SelectPresetComponent {
    public selectedLabel = {label: "中", size: "medium"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"}
    ]);
    cities = new ArrayCollection([
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ]);
    selectedCity = this.cities[0];

    get selectedCityName(): string {
        return this.selectedCity?.label;
    }

    public changePreset() {
        this.selectedCity = this.cities[Math.floor(Math.random() * this.cities.length)];
    }

    public selectNone() {
        this.selectedCity = undefined;
    }
    constructor(public text: SelectTextService) {}

}
