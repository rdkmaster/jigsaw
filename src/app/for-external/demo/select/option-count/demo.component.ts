import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "select-option-count",
    templateUrl: "./demo.component.html"
})
export class SelectOptionCountDemoComponent extends AsyncDescription {
    public demoPath = "demo/select/option-count";

    selectedCityForSelect: any;
    cityListForSelect = new ArrayCollection([
        { label: "北京" },
        { label: "上海" },
        { label: "南京" },
        { label: "深圳" },
        { label: "长沙" },
        { label: "西安" }
    ]);

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "medium" },
        { label: "大", size: "large" }
    ]);
    public selectedSize = { label: "中", size: "medium" };
}
