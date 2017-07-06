import { Component,AfterContentInit} from "@angular/core";
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
  templateUrl: 'multipleSelect.html'
})
export class TileselectMultipleSelectDemoComponent implements AfterContentInit{
    public selectedCity: ArrayCollection<any>;
    citys = new ArrayCollection([
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ]);
    constructor() {

    }
    ngAfterContentInit() {
        this.selectedCity= new ArrayCollection([{label: "深圳"}]);
    }
}

