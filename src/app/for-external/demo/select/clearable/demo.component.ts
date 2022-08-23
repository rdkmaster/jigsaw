import { Component } from "@angular/core";
import { SelectTextService } from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: "select-clearable",
    templateUrl: "./demo.component.html"
})

export class SelectClearableDemoComponent {
    public selectedCityForSelect: string;
    public cityList = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);

    public selectChange(selectedItem: any) {
        console.log("select city is: " + selectedItem);
    }

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "medium" },
        { label: "大", size: "large" }
    ]);
    public selectedSize = { label: "中", size: "medium" };
    constructor(public doc: SelectTextService) { }

}
