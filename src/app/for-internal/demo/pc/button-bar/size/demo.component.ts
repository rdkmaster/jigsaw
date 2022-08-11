import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class ButtonBarSizeDemoComponent {
    cities = new ArrayCollection([
        {label: "北京", id: 1},
        {label: "上海-一个很长的地址", id: 2},
        {label: "南京", id: 3},
        {label: "深圳", id: 4},
        {label: "长沙", id: 5},
        {label: "西安", id: 6}
    ]);
    selectedTypes = {label: "上海-一个很长的地址", id: 2};
    
    citiesEn = new ArrayCollection([
        {label: "BeiJing", id: 1},
        {label: "ShangHaiiiiiiiiiiiiiiiiii", id: 2},
        {label: "NanJing", id: 3},
        {label: "ShenZhen", id: 4},
        {label: "ChangSha", id: 5},
        {label: "Xi'an", id: 6}
    ]);
    selectedTypesEn = {label: "NanJing", id: 3};
    
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
