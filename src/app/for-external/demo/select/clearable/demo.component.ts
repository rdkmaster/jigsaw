import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "select-clearable",
    templateUrl: "./demo.component.html"
})

export class SelectClearableDemoComponent extends AsyncDescription {
    public demoPath = "demo/select/clearable";
    public selectedSize = { size: "medium" };

    public selectedCityForSelect: string;
    public cityList = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);

    public selectChange(selectedItem: any) {
        console.log("select city is: " + selectedItem);
    }
}
