import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SimpleTreeData} from "jigsaw/common/core/data/tree-data";
import {ArrayCollection} from "jigsaw/common/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html'
})
export class CascadeMultipleDemoComponent {
    areas: SimpleTreeData;

    constructor(http: HttpClient) {
        // 虽然是从ajax请求过来的，但是注意这是一笔静态数据
        http.get('/mock-data/tree-data').subscribe((data: SimpleTreeData) => this.areas = data);
    }

    message: string = '';

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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了如何通过multipleSelect属性设置级联组件最后一级支持多选的方法';
    description: string = '';
}

