import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class ListLiteAllComponent extends DemoSetBase {
    public demoPath = "demo/list-lite";
    public docPath = ['component/JigsawListLite'];
}

