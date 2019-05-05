import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TreeData} from "jigsaw/common/core/data/tree-data";

@Component({
    templateUrl: './demo.component.html'
})
export class CascadeTrackItemByDemoComponent {
    areas: TreeData;

    constructor(http: HttpClient) {
        // 虽然是从ajax请求过来的，但是注意这是一笔静态数据
        http.get('/mock-data/tree-data').subscribe((data: TreeData) => this.areas = data);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = 'trackItemBy用于告诉级联组件通过哪个或者哪些字段来区分所有条目';
    description: string = '';
}

