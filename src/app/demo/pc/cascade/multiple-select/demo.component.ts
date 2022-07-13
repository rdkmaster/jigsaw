import {Component} from "@angular/core";
import {CascadeTextService} from "../text.service";
import {SimpleTreeData} from "../../../../../jigsaw/common/core/data/tree-data";
import {HttpClient} from "@angular/common/http";
import {ArrayCollection} from "../../../../../jigsaw/common/core/data/array-collection";

@Component({
    selector: "multiple-select-cascade",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class CascadeMultipleComponent {
    areas: SimpleTreeData;
    message: string = '';
    constructor(http: HttpClient, public text: CascadeTextService) {
        // 虽然是从ajax请求过来的，但是注意这是一笔静态数据
        http.get('/mock-data/tree-data').subscribe((data: SimpleTreeData) => this.areas = data);
    }
    parseMessage(selectedItems) {
        this.message = selectedItems.reduce((result, item) => {
            const districts = [];
            if (item instanceof ArrayCollection || item instanceof Array) {
                item.forEach(district => districts.push(district.label));
            } else {
                districts.push(item.label);
            }
            result.push(districts.join(' & '));
            return result;
        }, []).join(' | ');
    }
}
