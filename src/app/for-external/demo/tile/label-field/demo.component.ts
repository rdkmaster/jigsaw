import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'tile-label-field',
    templateUrl: './demo.component.html'
})
export class TileSelectLabelFieldComponent extends AsyncDescription {
    public demoPath = "demo/tile/label-field";

    public citys = new ArrayCollection([
        { name: "北京" },
        { name: "上海" },
        { name: "南京" },
        { name: "深圳" },
        { name: "长沙" },
        { name: "西安" }
    ]);
}
