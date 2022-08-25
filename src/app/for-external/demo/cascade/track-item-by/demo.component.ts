import {Component, ElementRef} from "@angular/core";
import { SimpleTreeData } from "jigsaw/public_api";
import { HttpClient } from "@angular/common/http";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "cascade-track-item-by",
    templateUrl: "./demo.component.html"
})

export class CascadeTrackComponent extends AsyncDescription {
    public demoPath = "demo/cascade/track-item-by";

    public areas: SimpleTreeData;

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        // 虽然是从ajax请求过来的，但是注意这是一笔静态数据
        http.get('/mock-data/tree-data').subscribe((data: SimpleTreeData) => this.areas = data);
    }
}
