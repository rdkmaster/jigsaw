import { Component } from "@angular/core";
import { CascadeTextService } from "../doc.service";
import { SimpleTreeData } from "jigsaw/public_api";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "cascade-basic",
    templateUrl: "./demo.component.html",
})

export class CascadeBasicComponent {
    public areas: SimpleTreeData;
    public message: string = '';

    public parseMessage(selectedItems) {
        this.message = selectedItems.reduce((result, item) => {
            result.push(item.label);
            return result;
        }, []).join(' | ');
    }

    constructor(public http: HttpClient, public doc: CascadeTextService) {
        // 虽然是从ajax请求过来的，但是注意这是一笔静态数据
        http.get('/mock-data/tree-data').subscribe((data: SimpleTreeData) => this.areas = data);
    }
}
