import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "select-line-ellipsis",
    templateUrl: "./demo.component.html"
})

export class SelectLineEllipsisDemoComponent extends AsyncDescription {
    public demoPath = "demo/select/line-ellipsis";
    public selectedSize = { size: "medium" };

    public selectedCityForSelect: any;
    public cityListForSelect = new ArrayCollection([
        { label: "北京" },
        { label: "这是一个上海的标题，非常长，非常长，非常长，非常长，非常长。。。。" },
        { label: "南京" },
        { label: "深圳" },
        { label: "长沙" },
        { label: "西安" }
    ]);
}
