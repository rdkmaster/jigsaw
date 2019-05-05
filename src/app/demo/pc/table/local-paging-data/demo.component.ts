import {Component} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {LocalPageableTableData} from "jigsaw/common/core/data/table-data";
import {ColumnDefine} from "jigsaw/pc-components/table/table-typings";
import {SortAs, SortOrder} from "jigsaw/common/core/data/component-data";

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
    tags: string[] = [
        'LocalPageableTableData',
        'JigsawPagination',
        'JigsawTable.columnDefines',
        'ColumnDefine',
        'TableHeader.sortable',
        'TableHeader.sortAs',
        'TableHeader.defaultSortOrder'
    ];
}

