import {Component} from "@angular/core";
import {CascadeTextService} from "../text.service";
import {SimpleTreeData} from "jigsaw/public_api";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: "Track-cascade",
    templateUrl: "./demo.component.html"
})

export class CascadeTrackComponent {
    areas: SimpleTreeData;
    constructor(http: HttpClient, public text: CascadeTextService) {
        // 虽然是从ajax请求过来的，但是注意这是一笔静态数据
        http.get('/mock-data/tree-data').subscribe((data: SimpleTreeData) => this.areas = data);
    }
}
