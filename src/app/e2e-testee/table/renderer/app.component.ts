import {Component, ViewEncapsulation} from "@angular/core";
import {LocalPageableTableData, TableData} from "jigsaw/core/data/table-data";
import {DefaultCellRenderer} from "jigsaw/component/table/table-renderer";
import {AdditionalColumnDefine, ColumnDefine, rowIndexGenerator} from "jigsaw/component/table/table-typings";
import {TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/component/table/table-renderer";
import {TableCellOperation, TableHeadSelect} from "./table-renderer";
import {Http} from "@angular/http";


@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TableRendererDemoComponent {
    message: string = 'change message goes here ...';
    tableData: LocalPageableTableData;
    additionalData: TableData = new TableData();

    constructor(public http: Http) {
        this.tableData = new LocalPageableTableData();
        this.tableData.pagingInfo.pageSize = 10;
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
        this.tableData.dataReviser = rawData => {
            const td = TableData.of(rawData);
            const colData = [];
            td.data.forEach(row => colData.push(row[2]));
            td.insertColumn(3, colData, 'salary1', 'xinzi');
            return td;
        }
    }

    columnDefines: ColumnDefine[] = [
        {
            target: ['position', 'f7'],
            width: '20%',
            header: {
                renderer: TableHeadSelect,
                sortable: true
            },
            cell: {
                renderer: DefaultCellRenderer,
                editable: true,
                clazz: 'green-text'
            },
            group: true
        },
        {
            target: 'other', visible: false
        },
        {
            target: 'salary1',
            cell: {
                renderer: TableCellCheckboxRenderer,
                data: (td, row, col) => td.data[row][col] % 2
            },
            header: {
                renderer: TableHeadCheckboxRenderer
            }
        },
        {
            target: (f, i) => f == 'name',
            header: {sortable: true}
        },
    ];

    additionalColumnDefines: AdditionalColumnDefine[] = [
        {
            pos: 0,
            width: '50px',
            header: {
                text: '#',
            },
            cell: {
                data: rowIndexGenerator,
                clazz: 'green-text'
            }
        },
        {
            pos: 0,
            width: '60px',
            header: {
                renderer: TableHeadCheckboxRenderer
            },
            cell: {
                renderer: TableCellCheckboxRenderer,
                data: (td, row, col) => td.data[row][1] == 'Coder',
            }
        },
        {
            //pos: -1, //不写pos表示插入到最后
            width: '10%',
            header: {
                text: '操作',
                clazz: 'green-text'
            },
            cell: {
                renderer: TableCellOperation
            }
        },
    ];

    public onCellChange(value) {
        this.message = `field: '${value.field}', row: ${value.row}, column: ${value.column}, cellData: ${value.cellData}, oldCellData: ${value.oldCellData}`;
        let rows = value.row instanceof Array ? value.row : [value.row];
        for (let row of rows) {
            console.log(this.tableData.data[row][value.column]);
        }
    }
}

