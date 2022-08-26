import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "select-option-count",
    templateUrl: "./demo.component.html"
})
export class SelectOptionCountDemoComponent extends AsyncDescription {
    public demoPath = "demo/select/option-count";
    public selectedSize = { size: "medium" };

    selectedCityForSelect: any;
    cityListForSelect = new ArrayCollection([
        { label: "北京" },
        { label: "上海" },
        { label: "南京" },
        { label: "深圳" },
        { label: "长沙" },
        { label: "西安" }
    ]);
}
