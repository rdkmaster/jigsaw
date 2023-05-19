import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, ColumnDefine, TableCellSwitchRenderer, TableHeadCheckboxRenderer, AdditionalColumnDefine} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableSwitchRendererDemoComponent {
    tableData1: TableData;
    tableData2: TableData;
    columns1: ColumnDefine[];
    columns2: ColumnDefine[];
    changeMsg: string;
    editable = true;
    additional: AdditionalColumnDefine[] = [
        {
            header: {
                renderer: TableHeadCheckboxRenderer, rendererInitData: {title: '测试扩展列'}
            },
            cell: {
                renderer: TableCellSwitchRenderer
            }
        }
    ];

    constructor(http: HttpClient) {
        function dataReviser(data: TableData) {
            data.data = data.data.slice(0, 12);
            data = JSON.parse(JSON.stringify(data));
            data.field.splice(-1, 0, 'marriage');
            data.header.splice(-1, 0, '婚否');
            data.data.forEach(row => {
                row.splice(-1, 0, row[2] == "System Architect" ? 1 : 0);
            });
            return data;

        }
        this.tableData1 = new TableData();
        this.tableData1.http = http;
        // 添加switch列数据
        this.tableData1.dataReviser = dataReviser;
        this.tableData1.fromAjax('mock-data/hr-list');
        this.tableData2 = new TableData();
        this.tableData2.http = http;
        // 添加switch列数据
        this.tableData2.dataReviser = dataReviser;
        this.tableData2.fromAjax('mock-data/hr-list');
        this.createColumnDefines(false);
    }

    public createColumnDefines(readonly: boolean):void {
        this.columns1 = [
            {
                target: 'marriage',
                cell: {
                    renderer: TableCellSwitchRenderer,
                    rendererInitData: { readonly: readonly, onLabel: '已婚', offLabel: '未婚', size: 'default' }
                }
            },
            {target: 'position', visible: false}, {target: 'salary', visible: false},
            {target: 'office', visible: false}, {target: 'desc', visible: false},
            {target: 'position', visible: false}
        ];
        this.columns2 = [...this.columns1];
        this.columns2[0] = {
            target: 'marriage',
            cell: {
                renderer: TableCellSwitchRenderer,
                rendererInitData: {readonly}
            },
            header: {
                renderer: TableHeadCheckboxRenderer,
                rendererInitData: () => ({disabled: !this.editable, title: '测试内置列'})
            }
        }
        setTimeout(() => {
            this.tableData1.refresh();
            this.tableData2.refresh();
        });
    }

    onCellChange(value) {
        this.changeMsg = `field: '${value.field}', row: ${value.row}, column: ${value.column}, cellData: ${value.cellData}, oldCellData: ${value.oldCellData}`;
        let rows = value.row instanceof Array ? value.row : [value.row];
        for (let row of rows) {
            console.log('tableData1:', this.tableData1.data[row][value.column]);
            console.log('tableData2:', this.tableData2.data[row][value.column]);
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
