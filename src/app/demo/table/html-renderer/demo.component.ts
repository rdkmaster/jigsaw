import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RawTableData, TableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine, ColumnDefine} from "jigsaw/component/table/table-typings";
import {CommonUtils} from "../../../../jigsaw/core/utils/common-utils";

@Component({
    templateUrl: './demo.component.html'
})
export class TableHtmlRendererDemoComponent {

    tableData: TableData;

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
        this.tableData.dataReviser = data => {
            /* 这里复制一份数据，防止影响其他demo，代码可以忽略*/
            data = <RawTableData>CommonUtils.deepCopy(data);

            data.data.forEach(row => row[6] = `
                <p style="width: 50px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                 title="${row[6]}">${row[6]}</p>
            `);
            return data;
        }
    }

    columns: ColumnDefine[] = [
        {
            target: 'desc',
            cell: {
                renderer: 'html'
            }
        }
    ];

    additionalColumns: AdditionalColumnDefine[] = [
        {
            header: {
                text: '操作'
            },
            cell: {
                renderer: 'html',
                data: (data, row) => `<a onclick="onClick(${row}, 0)">修改</a> <a onclick="onClick(${row}, 1)">删除</a>`,
                innerHtmlContext: this
            }
        }
    ];

    property1 = 'modify';
    property2 = 'delete';

    onClick(row: number, type: number) {
        console.log(`Row number ${row} testing ${type == 0 ? this.property1 : this.property2}`);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawTable.columnDefines',
        'ColumnDefine',
        'TableCell.renderer'
    ];
}



