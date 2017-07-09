import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: 'checkbox.html',
    styleUrls: ['checkbox.css']
})
export class SelectCheckboxDemoComponent {
    selectedCityForSelect: any;
    cityListForSelect = new ArrayCollection([
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ]);
    public selectChange(message:any){
        console.log("select city is:"+ message.label);
    }
}

