import { Component } from "@angular/core";
import { ButtonBarTextService } from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: "button-bar-set-height",
    templateUrl: "./demo.component.html",
})

export class ButtonBarSetHeightComponent {
    public cities = new ArrayCollection(["北京-一个很长的地址", "上海", "南京", "深圳", "长沙", "西安"]);
    public selectedCity: any[] = ['南京'];
    public multiple: boolean = false;

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "大", size: "default" }
    ]);
    public selectedSize = { label: "大", size: "default" };
    constructor(public doc: ButtonBarTextService) { }
}
