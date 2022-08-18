import {Component} from "@angular/core";
import {ButtonBarTextService} from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: "button-bar-color-type",
    templateUrl: "./demo.component.html",
})

export class ButtonBarColorTypeComponent {
    public selectedLabel = {label: "大", size: "default"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "大", size: "default"}
    ]);
    multiple: boolean = false;
    colorType: string = 'warning';
    colorTypeList = ['default', 'primary', 'warning', 'danger', 'error'];
    cities = new ArrayCollection(["北京-一个很长的地址", "上海", "南京", "深圳", "长沙", "西安"]);
    selectedCity: any[] = ['南京'];

    constructor(public text: ButtonBarTextService) {}

}