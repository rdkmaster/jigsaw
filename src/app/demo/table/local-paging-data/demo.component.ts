import {Component} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {LocalPageableTableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-typings";
import {SortAs, SortOrder} from "jigsaw/core/data/component-data";

@Component({
    templateUrl: './demo.component.html'
})
export class LocalPagingDataDemoComponent {

    pageable: LocalPageableTableData;

    constructor(http: HttpClient) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/hr-list');
    }

    columns: ColumnDefine[] = [
        {
            target: 'salary',
            header: {
                sortable: true,
                sortAs: SortAs.string,
                defaultSortOrder: SortOrder.asc,
            }
        }, {
            target: 'name',
            header: {
                sortable: true,
                sortAs: SortAs.string,
                defaultSortOrder: SortOrder.desc,
            }
        }
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

