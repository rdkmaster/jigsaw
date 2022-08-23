import { Component } from "@angular/core";
import { SelectTextService } from "../doc.service";
import {
    ArrayCollection
} from "jigsaw/public_api";

@Component({
    selector: "select-searchable",
    templateUrl: "./demo.component.html"
})

export class SelectSearchableDemoComponent {
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
    constructor(public doc: SelectTextService) {
    }
}
