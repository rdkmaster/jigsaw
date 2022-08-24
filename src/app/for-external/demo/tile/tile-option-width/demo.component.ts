import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import { TileTextService } from "../doc.service";

@Component({
    selector: 'tile-option-width',
    templateUrl: './demo.component.html'
})
export class TileSelectOptionWidthComponent {
    public citys = new ArrayCollection([
        { label: "北京" },
        { label: "上海" },
        { label: "南京" },
        { label: "深圳" },
        { label: "长沙" },
        { label: "西安" }
    ]);

    constructor(public doc: TileTextService) {
    }
}
