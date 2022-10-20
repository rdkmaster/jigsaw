import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "radio-group-string",
    templateUrl: "./demo.component.html",
})

export class RadioDataIsStringArrayComponent extends AsyncDescription {
    public demoPath = "demo/radio/string-array";

    public cities = ["北京", "上海", "南京", "深圳", "长沙", "西安"];
    public selectedCity = "西安";
}
