import {
    Component, ViewEncapsulation, Renderer2, ViewContainerRef, ViewChild
} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";
import {
    TableHeadCheckbox,
    TableCellCheckbox,
    TableCellNum,
    TableCellEditor,
    DefaultCellRenderer
} from "jigsaw/component/table/table-renderer";
import {SortAs, SortOrder} from "jigsaw/core/data/component-data";
import {
    ColumnDefine, AdditionalColumnDefine, TableCellRenderer,
    tableRowIndexGenerator
} from "jigsaw/component/table/table-api";
import {TableHeadSelect, TableHeadIcon} from "./table-renderer";
import {JigsawTable} from "jigsaw/component/table/table";
import {CommonUtils} from "../../../../jigsaw/core/utils/common-utils";

/*
 * 操作列
 * */
@Component({
    template: '<a href="javascript:;">修改</a> <a href="javascript:;">删除</a>',
    styles: [`a{color: #ffaa00} a:hover{text-decoration: underline}`]
})
export class TableCellOption extends TableCellRenderer {
    constructor() {
        super();
        console.log('dddddddddddddddddddddddddd')
    }
}

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TableRendererDemoComponent {
    tableData: TableData;
    @ViewChild('table') table:JigsawTable;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
        this.tableData = new TableData([
            [11, 12, 13, 14, 15, 16, 17],
            [21, 22, 23, 24, 25, 26, 27],
            [31, 32, 33, 34, 35, 36, 37],
            [41, 42, 43, 44, 45, 46, 47],
            [51, 52, 53, 54, 55, 56, 57],
        ], ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7'], ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7']);

        let to = 0;
        let interval = 100;

        to += interval;
        setTimeout(() => {
            // this.tableData = new TableData(this.tableData.data, this.tableData.field, this.tableData.header);
            this.tableData.data[0][2] = 888;
            this.tableData.refresh();
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
                 clazz: 'green-text'
             },
             group: true
         },
         {
             target: ['f3'], visible: false
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
                data: tableRowIndexGenerator
            }
        },
        {
            pos: 0,
            field: 'f4',
            width: '60px',
            header: {
                sortable: true
                // renderer: TableHeadCheckbox
            },
            cell: {
                // renderer: TableCellCheckbox
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
                clazz: 'red-text'
            },
            cell: {
                renderer: TableCellOption
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

