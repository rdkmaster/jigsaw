import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "button-bar-title",
    templateUrl: "./demo.component.html",
})

export class ButtonBarTitleComponent extends AsyncDescription {
    public demoPath = "demo/button-bar/title";
    public selectedSize = { size: "default" };

    public cities = new ArrayCollection([
        { label: "北京", id: 1, title: "首都" },
        { label: "上海-一个很长的地址", id: 2, title: "直辖市" },
        { label: "南京", id: 3, title: "省会" },
        { label: "深圳", id: 4 },
        { label: "长沙", id: 5, disabled: true },
        { label: "西安", id: 6 }
    ]);
    public selectedCity: any[] = [{ label: "南京", id: 3 }];
    public multiple: boolean = false;
}
