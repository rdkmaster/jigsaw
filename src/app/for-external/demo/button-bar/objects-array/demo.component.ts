import { Component } from "@angular/core";
import { ButtonBarTextService } from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: "button-bar-objects-array",
    templateUrl: "./demo.component.html",
})

export class ButtonBarObjectsArrayComponent {
    public cities = new ArrayCollection([
        { label: "北京", id: 1 },
        { label: "上海-一个很长的地址", id: 2 },
        { label: "南京", id: 3 },
        { label: "深圳", id: 4 },
        { label: "长沙", id: 5, disabled: true },
        { label: "西安", id: 6 }
    ]);
    public selectedCity: any[] = [{ label: "南京", id: 3 }];
    public multiple: boolean = false;

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "大", size: "default" }
    ]);
    public selectedSize = { label: "大", size: "default" };
    constructor(public doc: ButtonBarTextService) { }

}
