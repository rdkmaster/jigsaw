import { Component,AfterContentInit} from "@angular/core";

@Component({
  templateUrl: 'selectedItems.html'
})
export class TileselectSelectedItemsComponent implements AfterContentInit{
    public selectedCity:any[];
    citys = [
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ];
    constructor(){

    }
    ngAfterContentInit() {
        this.selectedCity=[{label: "深圳"}];
    }
}

