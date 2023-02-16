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
    public additionalColumnDefinesData: TableData;

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
        
        this.additionalColumnDefinesData = new TableData(
            [
                [
                    "测试带\"双引号\"的文本",
                    "System Architect",
                    "$320,00",
                    "2011/04/25",
                    "Edinburgh",
                    542
                ],
                [
                    "测试带\'单引号\'的文本",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    8422
                ],
                [
                    "测试换行的文本\n测试换行的文本",
                    "System Architect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "测试换行的文本\r测试换行的文本",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "测试逗号，的文本",
                    "System Architect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "\"测试带双引号的文本\"",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    '"测试带双引号的文本"',
                    "System Architect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "测试带'单引号'的文本",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "'测试带单引号的文本'",
                    "System Architect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Garrett Wintsers2",
                    "Accountant",
                    "$170,50",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tiger Nixon3",
                    "System Architect",
                    "$320,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Tiger Nixon3",
                    "System Architect",
                    "$3,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Tiger Nixon3",
                    "System Architect",
                    "$320,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ]
            ],
            ["name", "position", "salary", "enroll-date", "office", "extn"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]);
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
