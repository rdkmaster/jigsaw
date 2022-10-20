import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class PaginationAllComponent extends DemoSetBase {
    public demoPath = "demo/pagination";
    public docPath = ['component/JigsawPagination'];
}

