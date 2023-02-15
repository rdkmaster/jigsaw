import { HttpClient } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { AdditionalColumnDefine, JigsawTable, LocalPageableTableData, PageableTableData, TableCellCheckboxRenderer, TableData, TableHeadCheckboxRenderer } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableDownloadDemoComponent {
    public tableData: TableData;
    public localPageableData: LocalPageableTableData;
    public pageableData: PageableTableData;

    @ViewChild('tableDataCmp')
    public tableDataCmp: JigsawTable;
    @ViewChild('localPageableDataCmp')
    public localPageableDataCmp: JigsawTable;
    @ViewChild('pageableDataCmp')
    public pageableDataCmp: JigsawTable;
    @ViewChild('additionalColumnDefinesCmp')
    public additionalColumnDefinesCmp: JigsawTable;

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');

        this.localPageableData = new LocalPageableTableData();
        this.localPageableData.http = http;
        this.localPageableData.pagingInfo.pageSize = 10;
        this.localPageableData.fromAjax('mock-data/hr-list-full');

        this.pageableData = new PageableTableData(http, {
            url: 'mock-data/hr-list', body: { aa: 11, bb: 22 }, method: 'post'
        });
        this.pageableData.pagingInfo.pageSize = 10;
    }

    public download(type: string) {
        if (type == 'tableData') {
            console.log(this.tableData);
            this.tableDataCmp.download('my_data.csv');
            return;
        }
        if (type == 'localPageableData') {
            console.log(this.localPageableData);
            this.localPageableDataCmp.download('my_data.csv');
            return;
        }
        if (type == 'pageableData') {
            console.log(this.pageableData);
            this.pageableDataCmp.download('my_data.csv');
            return;
        }
        if (type == 'additionalColumnDefines') {
            console.log(this.additionalColumnDefines);
            this.additionalColumnDefinesCmp.download('my_data.csv');
            return;
        }
    }

    public additionalColumnDefines: AdditionalColumnDefine[] = [
        {
            pos: 0,
            width: '60px',
            header: {
                renderer: TableHeadCheckboxRenderer
            },
            cell: {
                renderer: TableCellCheckboxRenderer
            }
        }
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
