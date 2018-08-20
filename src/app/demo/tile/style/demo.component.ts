import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html'
})
export class TileSelectStyleComponent {
    citys = new ArrayCollection([
        {name: "北京"},
        {name: "上海"},
        {name: "南京"},
        {name: "深圳"},
        {name: "长沙"},
        {name: "西安"}
    ]);

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawTile.trackItemBy',
    ];
}

