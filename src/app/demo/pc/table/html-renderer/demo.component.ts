import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    RawTableData, TableData, AdditionalColumnDefine, ColumnDefine,
    CommonUtils, SortAs, SortOrder
} from "jigsaw/public_api";

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
        },
        {
            target: 'salary',
            header: {
                renderer: 'html',
                data: (data, col) => `${data.header[col]}
                    <select onchange="changeUnit()" id="unitSelect">
                        <option value="￥">￥</option>
                        <option value="$">$</option>
                    </select>`,
                innerHtmlContext: this,
                sortable: true,
                sortAs: SortAs.number,
                defaultSortOrder: SortOrder.asc
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

    changeUnit() {
        let unitSelect: any = document.getElementById("unitSelect");
        let curUnit = unitSelect.options[unitSelect.selectedIndex].value;
        console.log(curUnit);
        this.tableData.data = this.tableData.data.concat().map(row => {
            row[3] = curUnit == '￥' ? row[3]*7 : Math.round(row[3]/7);
            return row;
        });
        this.tableData.refresh();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
