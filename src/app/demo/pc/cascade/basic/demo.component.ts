import {Component} from "@angular/core";
import {CascadeTextService} from "../text.service";
import {SimpleTreeData} from "../../../../../jigsaw/common/core/data/tree-data";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: "basic-cascade",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class CascadeBasicComponent {
    areas: SimpleTreeData;

    constructor(public http: HttpClient, public text: CascadeTextService) {
        // 虽然是从ajax请求过来的，但是注意这是一笔静态数据
        http.get('/mock-data/tree-data').subscribe((data: SimpleTreeData) => this.areas = data);
    }

    message: string = '';

    parseMessage(selectedItems) {
        this.message = selectedItems.reduce((result, item) => {
            result.push(item.label);
            return result;
        }, []).join(' | ');
    }
}
