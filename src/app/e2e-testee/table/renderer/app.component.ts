import {Component, Renderer2, ViewChild, ViewContainerRef, ViewEncapsulation} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";
import {DefaultCellRenderer} from "jigsaw/component/table/table-renderer";
import {AdditionalColumnDefine, ColumnDefine, TableCellValueGenerators} from "jigsaw/component/table/table-typings";
import {TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/component/table/table-renderer";
import {TableCellOperation, TableHeadSelect} from "./table-renderer";
import {Http} from "@angular/http";


@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TableRendererDemoComponent {
    tableData: TableData;

    constructor(public http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
        // this.tableData.dataReviser = data => {
        //     data.data.splice(50, 10000);
        //     return data;
        // }
    }

    columnDefines: ColumnDefine[] = [
        {
            target: ['name', 'f7'],
            width: '10%',
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
            target: 3, width: '180px'
        },
        {
            target: (f, i) => f == 'f4',
            header: {text: 'custom header text'}
        },
    ];

    extraColumnDefines: AdditionalColumnDefine[] = [
        {
            pos: 0,
            width: '30px',
            header: {
                text: '#',
            },
            cell: {
                data: TableCellValueGenerators.rowIndexGenerator,
                clazz: 'green-text'
            }
        },
        {
            pos: 0,
            field: 'f4',
            width: '60px',
            header: {
                sortable: true,
                renderer: TableHeadCheckboxRenderer
            },
            cell: {
                renderer: TableCellCheckboxRenderer,
                data: (td, row, col) => td.data[row][3] == 'Coder',
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
        this._changeMsg = `field: '${value.field}', row: ${value.row}, column: ${value.column}, cellData: ${value.cellData}, oldCellData: ${value.oldCellData}`;
        let rows = value.row instanceof Array ? value.row : [value.row];
        for (let row of rows) {
            console.log(this.tableData.data[row][value.column]);
        }
    }

    _changeMsg: string;

}

