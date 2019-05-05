import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TreeData} from "jigsaw/common/core/data/tree-data";

@Component({
    templateUrl: './demo.component.html'
})
export class CascadeBasicDemoComponent {
    areas: TreeData;

    constructor(http: HttpClient) {
        // 虽然是从ajax请求过来的，但是注意这是一笔静态数据
        http.get('/mock-data/tree-data').subscribe((data: TreeData) => this.areas = data);
    }

    message: string = '';

    parseMessage(selectedItems) {
        this.message = selectedItems.reduce((result, item) => {
            result.push(item.label);
            return result;
        }, []).join(' | ');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '以行政区选择作为场景，说明如何使用静态数据来实现级联数据的选择';
    description: string = '';
}

