import { Component} from "@angular/core";

@Component({
  templateUrl: 'searchable.html'
})
export class TileselectSearchableComponent {

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

}

