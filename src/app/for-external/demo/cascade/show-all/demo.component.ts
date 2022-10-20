import {Component, ElementRef} from "@angular/core";
import { SimpleTreeData } from "jigsaw/public_api";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "cascade-show-all",
    templateUrl: "./demo.component.html"
})

export class CascadeShowAllComponent extends AsyncDescription {
    public demoPath = "demo/cascade/show-all";

    public areas: SimpleTreeData;

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        // 虽然是从ajax请求过来的，但是注意这是一笔静态数据
        http.get('/mock-data/tree-data')
            .pipe(map((data: SimpleTreeData) => {
                // 加工一下原始数据，给北京市和江苏省-南京市添加全选功能
                data.nodes[0].showAll = true;
                data.nodes[2].nodes[0].showAll = true;
                return data;
            }))
            .subscribe((data: SimpleTreeData) => this.areas = data);
    }
}
