import {AfterViewInit, Component, ViewChild, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/common/core/data/table-data";
import {ColumnDefine} from "jigsaw/pc-components/table/table-typings";
import {JigsawInput} from "jigsaw/pc-components/input/input";
import {
    TableCellRendererBase,
    TableCellNumericEditorRenderer,
    TableCellAutoCompleteEditorRenderer
} from "jigsaw/pc-components/table/table-renderer";


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

    @ViewChild(JigsawInput, {static: false}) input: JigsawInput;

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
            target: 'desc',
            cell: {
                renderer: MyTableCell,
                editable: true,
                editorRenderer: MyTableCellEditor,
                editorRendererInitData: {placeholder: "Type to edit..."}
            }
        },
        {
            target: 'salary',
            width: '20%',
            group: true,
            cell: {
                editable: true,
                editorRenderer: TableCellNumericEditorRenderer,
                editorRendererInitData:
                    {
                        placeholder: "Type to edit...",
                        min: 12000,
                        step: 100
                    }
            }
        },
        {
            target: 'position',
            width: '20%',
            group: true,
            cell: {
                editable: true,
                editorRenderer: TableCellAutoCompleteEditorRenderer,
                editorRendererInitData: ()=>{
                    return {
                        placeholder: "Try to edit...",
                        data: ["Developer", "System Architect", "Test Engineer"]
                    }
                }

            }
        },
    ];

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
}



