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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'PageableTableData',
        'JigsawPagination',
        'JigsawTable.columnDefines',
        'ColumnDefine',
        'TableHeader.sortable'
    ];
}

