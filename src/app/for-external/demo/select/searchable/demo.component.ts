import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "select-searchable",
    templateUrl: "./demo.component.html"
})
export class SelectSearchableDemoComponent extends AsyncDescription {
    public demoPath = "demo/select/searchable";
    public selectedSize = { size: "medium" };

    public selectedCityForSelect: any;
    public cityListForSelect = new ArrayCollection([
        { label: "北京" },
        { label: "上海" },
        { label: "南京" },
        { label: "深圳" },
        { label: "长沙" },
        { label: "西安" }
    ]);
}
