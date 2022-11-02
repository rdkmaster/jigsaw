import { Component } from "@angular/core";
import { DemoSetBase } from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class TileAllComponent extends DemoSetBase {
    public demoPath = "demo/tile";
    public docPath = ['component/JigsawTile'];
}

