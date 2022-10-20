import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'tile-option-width',
    templateUrl: './demo.component.html'
})
export class TileSelectOptionWidthComponent extends AsyncDescription {
    public demoPath = "demo/tile/tile-option-width";

    public cities = new ArrayCollection([
        { label: "北京" },
        { label: "上海" },
        { label: "南京" },
        { label: "深圳" },
        { label: "长沙" },
        { label: "西安" }
    ]);
}
