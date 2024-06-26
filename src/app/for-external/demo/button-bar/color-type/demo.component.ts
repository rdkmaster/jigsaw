import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "button-bar-color-type",
    templateUrl: "./demo.component.html",
})

export class ButtonBarColorTypeComponent extends AsyncDescription {
    public demoPath = "demo/button-bar/color-type";
    public selectedSize = { size: "default" };

    public cities = new ArrayCollection(["北京-一个很长的地址", "上海", "南京", "深圳", "长沙", "西安"]);
    public selectedCity: any[] = ['南京'];
    public multiple: boolean = false;
}
