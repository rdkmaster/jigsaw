import {Component} from "@angular/core";
import {ButtonBarTextService} from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: "button-bar-string-array",
    templateUrl: "./demo.component.html",
})

export class ButtonBarStringArrayComponent {
    public selectedLabel = {label: "大", size: "default"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "大", size: "default"}
    ]);
    multiple: boolean = false;
    selectedCityStr: string;
    selectedCity: any[] = ['南京'];
    cities = new ArrayCollection(["北京-一个很长的地址", "上海", "南京", "深圳", "长沙", "西安"]);

    selectChange(cityArr: ArrayCollection<any>) {
        this.selectedCityStr = cityArr.join(',');
    }

    constructor(public text: ButtonBarTextService) {}
}