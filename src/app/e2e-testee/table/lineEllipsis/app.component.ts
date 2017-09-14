import {
    Component, ViewEncapsulation, Renderer2, ViewContainerRef
} from "@angular/core";
import {
    TableData
} from "jigsaw/core/data/table-data";
import {
    TableCellCheckboxRenderer, TableCellRendererBase, TableCellTextEditorRenderer, TableHeadCheckboxRenderer
} from "jigsaw/component/table/table-renderer";
import {
    ColumnDefine, AdditionalColumnDefine, TableCellValueGenerators
} from "jigsaw/component/table/table-typings";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TableLineEllipsisDemoComponent {
    tableData: TableData;
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
        this.tableData = new TableData([
            [22, '66打个广告，打个', '66打个广告，打个广告打个广告打个广告', 0, 12, 12],
            [22, 22, 11, 1, 23, 22],
            [22, 43, 11, 1, 43, 77],
            [22, 12, 12, 0, 12, 77],
            [23, '66打个广告，打个广告打个广告打个广告', '66打个广告，打个广告打个广告打个广告', 1, 23, 23],
            [43, 55, 43, 0, 44, 43],
            [12, 55, 12, 1, 44, 12],
            [23, 55, '66打个广告，打个66打个广告，打个66打个广告，打个66打个广告，打个66打个广告，打个66打个广告，打个66打个广告，打个66打个广告，打个66打个广告，打个66打个广告，打个66打个广告，打个', 1, 44, 23],
            [43, 43, 43, 0, 44, 43],
            [12, 12, 33, 0, 12, 66],
            [23, 23, 33, 0, 88, 66],
            [43, 43, 33, 1, 88, 66],
            [12, 11, 12, 1, 88, 66],
            [23, 11, 23, 0, 23, 23],
            [43, 43, 43, 1, 43, 43],
            [12, 12, 12, 1, 99, 12],
            [23, 23, 23, 0, 99, 23],
            [43, 43, 43, 1, 99, 43]
        ], ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'], ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
    }

     _columns: ColumnDefine[] = [
        {
            target: 'f1',
            width: '15%',
            group: true
        },
        {
            target: 'f2',
            width: '10%',
            cell: {
                editable: true,
                editorRenderer: TableCellTextEditorRenderer,
            },
            group: true
        },
        {
            target: 'f3',
            width: '100px',
            group: true
        },
        {
            target: 'f4',
            visible: false
        },
        {
            target: 'f5',
            group: true
        },
        {
            target: 'f6',
            group: true
        }
    ];

     _additionalColumns: AdditionalColumnDefine[] = [
        {
            pos: 0,
            width: '60px',
            header: {
                text: '#',
            },
            cell: {
                data: TableCellValueGenerators.rowIndexGenerator
            }
        },
        {
            pos: 0,
            width: '60px',
            header: {
                renderer: TableHeadCheckboxRenderer
            },
            cell: {
                renderer: TableCellCheckboxRenderer
            }
        },
        {
            width: '10%',
            header: {
                text: '操作'
            },
            cell: {
                renderer: TableCellOption
            }
        }
    ];

    public onCellChange(value) {
        this._changeMsg = `field: '${value.field}', row: ${value.row}, column: ${value.column}, cellData: ${value.cellData}, oldCellData: ${value.oldCellData}`;
        let rows = value.row instanceof Array ? value.row : [value.row];
        for(let row of rows){
            console.log(this.tableData.data[row][value.column]);
        }
    }

     _changeMsg: string;

}

/*
 * 操作列
 * */
@Component({
    template: '<a href="javascript:;">修改</a> <a href="javascript:;">删除</a>',
    styles: [`a{color: #ffaa00} a:hover{text-decoration: underline}`]
})
export class TableCellOption extends TableCellRendererBase {
}
