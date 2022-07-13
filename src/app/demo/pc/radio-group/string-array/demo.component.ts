import {Component} from "@angular/core";
import {RadioTextService} from "../text.service";
import {ArrayCollection} from "jigsaw/public_api";

@Component({
    selector: "data-is-string-array-radio",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class RadioDataIsStringArrayComponent {
    citys = ["北京", "上海", "南京", "深圳", "长沙", "西安"];
    selectedCity = "西安";
    constructor(public text: RadioTextService) {}

}
