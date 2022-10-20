import { Component } from "@angular/core";
import {DemoSetBase} from "../../demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html",
})
export class AlphabeticalIndexDemoComponent extends DemoSetBase {
    public demoPath = "demo/alphabetical-index";
    public docPath = ['component/JigsawAlphabeticalIndex', 'component/JigsawAlphabeticalIndexSelect'];
}
