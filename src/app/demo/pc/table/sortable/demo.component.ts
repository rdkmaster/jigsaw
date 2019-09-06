import {Component, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/common/core/data/table-data";
import {ColumnDefine} from "jigsaw/pc-components/table/table-typings";
import {SortAs, SortOrder} from "jigsaw/common/core/data/component-data";
import {JigsawTable} from "../../../../../jigsaw/pc-components/table/table";


@Component({
    templateUrl: './demo.component.html'
})
export class TableSetHeaderSortDemoComponent {
    @ViewChild(JigsawTable, {static: false}) table: JigsawTable;

    tableData: TableData;

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
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

    changeData() {
        this.tableData.fromAjax('mock-data/hr-list-short');
        this.table.resetSort();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'ColumnDefine.header',
        'TableHeader.sortable',
        'TableHeader.sortAs',
        'TableHeader.defaultSortOrder',
    ];
}



