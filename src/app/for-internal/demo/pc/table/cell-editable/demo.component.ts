import {AfterViewInit, Component, ViewChild, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    TableData, ColumnDefine, JigsawInput, TableCellRendererBase,
    TableCellNumericEditorRenderer, TableCellAutoCompleteEditorRenderer, TableCellSwitchRenderer, TableCellTextEditorRenderer
} from "jigsaw/public_api";

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
        <jigsaw-input #input [(value)]="cellData" [clearable]="false" height="28px"
                      (blur)="dispatchChangeEvent(cellData)" [placeholder]="_$placeholder">
        </jigsaw-input>`
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
        // 添加switch列数据
        this.tableData.dataReviser = data => {
            data = JSON.parse(JSON.stringify(data));
            data.field.splice(-1, 0, 'marriage');
            data.header.splice(-1, 0, '婚否');
            data.data.forEach(row => {
                row.splice(-1, 0, row[2] == "System Architect" ? 1 : 0);
            });
            return data;
        }
    }

    columns: ColumnDefine[] = [
        {
            target: 'name',
            cell: {
                editable: true,
                editorRenderer: TableCellTextEditorRenderer,
                editorRendererInitData: {
                    disabled: (data, row, cell) => {
                        return row % 2
                    }
                }
            }
        },
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
            cell: {
                editable: true,
                editorRenderer: TableCellNumericEditorRenderer,
                editorRendererInitData:
                {
                    placeholder: (data, row, cell) => {
                        return `placeholder${row}`
                    },
                    min: (data, row, cell) => {
                        return (row + 1) * 1000
                    },
                    max: (data, row, cell) => {
                        return (row + 1) * 10000
                    },
                    step: (data, row, cell) => {
                        return 100
                    }
                }
            }
        },
        {
            target: 'position',
            width: '250',
            cell: {
                editable: true,
                editorRenderer: TableCellAutoCompleteEditorRenderer,
                editorRendererInitData: (td, row, col) => {
                    return {
                        data: ["Developer", "System Architect", "Test Engineer"],
                        placeholder: "Try to edit...",
                        disabled: false
                    };
                }
            }
        },
        {
            target: 'marriage',
            cell: {
                renderer: TableCellSwitchRenderer
            }
        }
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
