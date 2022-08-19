import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";
import {TileTextService} from "../doc.service";

@Component({
    selector: 'tile-label-field',
    templateUrl: './demo.component.html'
})
export class TileSelectLabelFieldComponent {
    citys = new ArrayCollection([
        {name: "北京"},
        {name: "上海"},
        {name: "南京"},
        {name: "深圳"},
        {name: "长沙"},
        {name: "西安"}
    ]);

    constructor(public doc: TileTextService) {
    }
}
