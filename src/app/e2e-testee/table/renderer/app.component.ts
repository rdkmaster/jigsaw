import {Component, Renderer2, ViewChild, ViewContainerRef, ViewEncapsulation} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";
import {DefaultCellRenderer} from "jigsaw/component/table/table-renderer";
import {AdditionalColumnDefine, ColumnDefine, tableRowIndexGenerator} from "jigsaw/component/table/table-typings";
import {TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/component/table/table-renderer";
import {TableCellOperation, TableHeadSelect} from "./table-renderer";


@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TableRendererDemoComponent {
    tableData: TableData;
    selectedRow = 2;
    hideHead = false

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
        this.tableData = new TableData([
            [11, 12, 13, 14, 15, 16, 17],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [51, 52, 53, 54, 55, 56, 12],
        ], ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7'], ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7']);

        let to = 0;
        let interval = 100;

        to += interval;
        setTimeout(() => {
            // this.tableData = new TableData(this.tableData.data, this.tableData.field, this.tableData.header);
            this.tableData.data[0][2] = 888;
            this.tableData.refresh();

            this.selectedRow = 4;
        }, to);
        //
        // to += interval;
        // setTimeout(() => {
        //     // this.tableData = new TableData(this.tableData.data, this.tableData.field, this.tableData.header);
        //     this.tableData.data.push([51, 52, 53, 54, 55, 56, 57]);
        //     this.tableData.refresh();
        // }, to)
        //
        // to += interval;
        // setTimeout(() => {
        //     // this.tableData = new TableData(this.tableData.data, this.tableData.field, this.tableData.header);
        //     this.tableData.data.splice(3, 1, [61, 62, 63, 64, 65, 66, 67], [71, 52, 73, 74, 75, 76, 77]);
        //     this.tableData.refresh();
        // }, to)
        //
        // to += interval;
        // setTimeout(() => {
        //     // this.tableData = new TableData(this.tableData.data, this.tableData.field, this.tableData.header);
        //     this.tableData.data.forEach(row => row.push(88));
        //     this.tableData.field.push('f8');
        //     this.tableData.header.push('h8');
        //
        //     this.tableData.data.forEach(row => row.splice(2, 0, 99));
        //     this.tableData.field.splice(2, 0, 'f9');
        //     this.tableData.header.splice(2, 0, 'h9');
        //
        //     this.tableData.refresh();
        // }, to)
        //
        // to += interval;
        // setTimeout(() => {
        //     const cd = this._columns.concat();
        //     cd.push({target: 'f9', group: true, visible: true});
        //     this._columns = cd;
        // }, to);
    }

     _columns: ColumnDefine[] = [
         {
             target: ['f1', 'f2'],
             width: '15%',
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
             target: ['f3'], visible: false
         },
         {
             target: ['f7'], width: '120px'
         },
         {
             target: (f, i) => f == 'f4',
             header: {text: 'red-text'}
         },
    ];

     _additionalColumns: AdditionalColumnDefine[] = [
        {
            pos: 0,
            width: '60px',
            header: {
                text: '#',
            },
            cell: {
                data: tableRowIndexGenerator,
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
                editable: true,
                renderer: TableCellCheckboxRenderer,
                data: (td, row, col) => row % 2,
            }
        },
        /*{
            pos: 0,
            width: '60px',
            header: {
                renderer: TableHeadCheckbox,
            },
            cell: {
                renderer: TableCellCheckbox
            }
        },*/
        {
            //pos: -1, //不写pos也表示插入到最后
            width: '10%',
            header: {
                text: '操作',
                clazz: 'green-text'
            },
            cell: {
                renderer: TableCellOperation
            }
        },
        /*{
            pos: 2,
            width: '10%',
            header: {
                renderer: TableHeadOption,
                class: 'red-text'
            },
            cell: {
                renderer: TableCellOption
            }
        }*/
    ];

    public onCellChange(value) {
        this._changeMsg = `field: '${value.field}', row: ${value.row}, column: ${value.column}, rawColumn: ${value.rawColumn}, cellData: ${value.cellData}, oldCellData: ${value.oldCellData}`;
        let rows = value.row instanceof Array ? value.row : [value.row];
        for(let row of rows){
            console.log(this.tableData.data[row][value.rawColumn]);
        }
    }

     _changeMsg: string;

}

