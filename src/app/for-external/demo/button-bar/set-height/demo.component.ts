import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "button-bar-set-height",
    templateUrl: "./demo.component.html",
})

export class ButtonBarSetHeightComponent extends AsyncDescription {
    public demoPath = "demo/button-bar/set-height";

    public cities = new ArrayCollection(["北京-一个很长的地址", "上海", "南京", "深圳", "长沙", "西安"]);
    public selectedCity: any[] = ['南京'];
    public multiple: boolean = false;
}
