import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PageableTableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-typings";

@Component({
    templateUrl: './demo.component.html'
})
export class TablePageableDemoComponent {
    pageable: PageableTableData;

    constructor(http: HttpClient) {
        this.pageable = new PageableTableData(http, {
            url: 'mock-data/countries', body: {aa: 11, bb: 22}, method: 'post'
        });
        /*this.pageable = new PageableTableData(http, {
            url: 'mock-data/countries', params: {aa: 11, bb: 22}
        });*/
        this.pageable.onAjaxComplete(() => {
            console.log(this.pageable);
        });
        this.pageable.pagingInfo.pageSize = 5;
        this.pageable.fromAjax();
    }

    columnDefines: ColumnDefine[] = [
        {
            target: 0,
            header: {
                sortable: true
            }
        }
    ];

    onSearch(reg) {
        // 这里需要特别注意，filter函数的执行是在服务端，而非在浏览器！
        // 这里context变量是filter的执行上下文（即filter函数里的this所指向的对象），它将会一起传输给服务端，
        // 因此这里需要注意控制context的值里只包含有用的数据，以加快前后端通信速度
        const filter = function(item) {
            return item[0].match(new RegExp(this.reg, 'g'));
        };
        const context = {reg};

        this.pageable.filter(filter, context);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

