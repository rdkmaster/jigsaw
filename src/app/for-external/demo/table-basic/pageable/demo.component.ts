import {Component, ElementRef} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    PageableTableData, ColumnDefine, DataSortInfo, SortAs,
    SortOrder
} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'table-basic-pageable',
    templateUrl: './demo.component.html'
})
export class TableBasicPageableDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-basic/pageable";

    public pageable: PageableTableData;

    public columnDefines: ColumnDefine[] = [
        {
            target: 'salary',
            header: {
                sortable: true,
                sortAs: SortAs.number,
                defaultSortOrder: SortOrder.desc
            }
        }, {
            target: 'name',
            header: {
                sortable: true,
                sortAs: SortAs.string,
            }
        }
    ];

    public onSearch(reg) {
        console.log(reg);
        // 这里需要特别注意，filter函数的执行是在服务端，而非在浏览器！
        // 这里context变量是filter的执行上下文（即filter函数里的this所指向的对象），它将会一起传输给服务端，
        // 因此这里需要注意控制context的值里只包含有用的数据，以加快前后端通信速度
        const filter = function (item) {
            return item[0].match(new RegExp(this.reg, 'g'));
        };
        const context = { reg };

        this.pageable.filter(filter, context);
    }

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.pageable = new PageableTableData(http, {
            url: 'mock-data/hr-list', body: { aa: 11, bb: 22 }, method: 'post'
        });
        /*this.pageable = new PageableTableData(http, {
            url: 'mock-data/hr-list', params: {aa: 11, bb: 22}
        });*/
        this.pageable.onAjaxComplete(() => {
            console.log(this.pageable);
        });
        this.pageable.pagingInfo.pageSize = 5;
        // pageableTableData的DataSortInfo只支持字符串参数，不支持枚举和索引
        this.pageable.sortInfo = new DataSortInfo('number', 'desc', 'salary');
    }
}
