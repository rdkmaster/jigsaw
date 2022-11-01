import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "select-string",
    templateUrl: "demo.component.html"
})
export class SelectStringDemoComponent extends AsyncDescription {
    public demoPath = "demo/select/string";
    public selectedSize = { size: "medium" };

    public selectedCityForSelect: string;
    public cityArrayList = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);
}
