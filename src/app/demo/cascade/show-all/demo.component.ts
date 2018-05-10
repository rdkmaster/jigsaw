import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TreeData} from "jigsaw/core/data/tree-data";

@Component({
    templateUrl: './demo.component.html'
})
export class CascadeShowAllDemoComponent {
    areas: TreeData;

    constructor(http: HttpClient) {
        // 虽然是从ajax请求过来的，但是注意这是一笔静态数据
        http.get('/mock-data/tree-data')
            .map((data: TreeData) => {
                // 加工一下原始数据，给北京市和江苏省-南京市添加全选功能
                data.nodes[0].showAll = true;
                data.nodes[2].nodes[0].showAll = true;
                return data;
            })
            .subscribe((data: TreeData) => this.areas = data);
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
    summary: string = '本demo演示了如何在某一级上添加一个“全选”按钮';
    description: string = '';
}

