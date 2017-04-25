import { Component,AfterContentInit} from "@angular/core";

@Component({
  templateUrl: 'labelField.html'
})
export class TileselectLabelFieldComponent {
    citys = [
        {name: "北京"},
        {name: "上海"},
        {name: "南京"},
        {name: "深圳"},
        {name: "长沙"},
        {name: "西安"}
    ];
    constructor(){

    }
}

