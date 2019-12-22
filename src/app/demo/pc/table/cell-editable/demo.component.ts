import {AfterViewInit, Component, ViewChild, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/common/core/data/table-data";
import {ColumnDefine} from "jigsaw/pc-components/table/table-typings";
import {JigsawInput} from "jigsaw/pc-components/input/input";
import {TableCellRendererBase} from "jigsaw/pc-components/table/table-renderer";


/*
 * 自定义单元格渲染组件
 * */
@Component({
    template: '<span>{{cellData}}</span>'
})
export class MyTableCell extends TableCellRendererBase {
}

/*
 * 编辑单元格渲染器
 * */
@Component({
    template: `
        <jigsaw-input #input [(value)]="cellData" [clearable]="false"
                      (blur)="dispatchChangeEvent(cellData)" [placeholder]="_$placeholder"></jigsaw-input>`
})
export class MyTableCellEditor extends TableCellRendererBase implements AfterViewInit {

    @ViewChild(JigsawInput) input: JigsawInput;

    public get _$placeholder() {
        return this.initData && this.initData.placeholder ? this.initData.placeholder : '';
    }

    ngAfterViewInit() {
        this.input.focus();
    }

}

@Component({
    templateUrl: './demo.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TableSetCellEditableDemoComponent {
    tableData: TableData;

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    columns: ColumnDefine[] = [
        {
            target: 'position',
            width: '20%',
            group: true,
            cell: {
                renderer: MyTableCell,
                editable: true,
                editorRenderer: MyTableCellEditor,
                editorRendererInitData: {placeholder: "Type to edit..."}
            }
        }];

    changeMsg: string;

    onCellChange(value) {
        this.changeMsg = `field: '${value.field}', row: ${value.row}, column: ${value.column}, cellData: ${value.cellData}, oldCellData: ${value.oldCellData}`;
        let rows = value.row instanceof Array ? value.row : [value.row];
        for (let row of rows) {
            console.log(this.tableData.data[row][value.column]);
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawTable.columnDefines',
        'JigsawTable.dataChange',
        'ColumnDefine',
        'TableCell.renderer',
        'TableCell.editable',
        'TableCell.editorRenderer',
    ];
}



