import {Component} from "@angular/core";
import {RadioTextService} from "../doc.service";
import {ArrayCollection} from "jigsaw/public_api";

@Component({
    selector: "radio-group-string",
    templateUrl: "./demo.component.html",
})

export class RadioDataIsStringArrayComponent {
    citys = ["北京", "上海", "南京", "深圳", "长沙", "西安"];
    selectedCity = "西安";
    constructor(public doc: RadioTextService) {}

}
