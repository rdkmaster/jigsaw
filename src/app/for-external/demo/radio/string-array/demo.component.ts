import { Component } from "@angular/core";
import { RadioTextService } from "../doc.service";

@Component({
    selector: "radio-group-string",
    templateUrl: "./demo.component.html",
})

export class RadioDataIsStringArrayComponent {
    public citys = ["北京", "上海", "南京", "深圳", "长沙", "西安"];
    public selectedCity = "西安";

    constructor(public doc: RadioTextService) { }
}
