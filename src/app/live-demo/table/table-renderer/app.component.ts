import {Component, OnInit, ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {TableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine, ColumnDefine, TableDataChangeEvent} from "jigsaw/component/table/table-api";
import {TableCellCheckbox, TableCellEditor, TableCellNum, TableHeadCheckbox} from "jigsaw/component/table/table-renderer";
import {JigsawTable, TableCellRenderer} from "jigsaw/component/table/table";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class TableRendererLiveDemo {
    tableData: TableData;

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }

    columns: ColumnDefine[] = [
        {
            target: 'position',
            cell: {
                renderer: MyEditableCell,
                editable: true,
                editorRenderer: TableCellEditor,
            }
        },
        {
            target: 'salary',
            cell: {
                renderer: MySalaryHeightLightCell
            }
        },
    ];

    additionalColumns: AdditionalColumnDefine[] = [
        {
            pos: 0,
            width: '60px',
            header: {
                text: '#',
            },
            cell: {
                renderer: TableCellNum
            }
        },
        {
            pos: 0,
            width: '60px',
            header: {
                renderer: TableHeadCheckbox
            },
            cell: {
                renderer: TableCellCheckbox
            }
        },
        {
            header: {
                text: '操作',
            },
            cell: {
                renderer: MyOptionCell
            }
        }
    ];

    changeMsg: string;
    selectedRows: string;
    @ViewChild('myTable') myTable: JigsawTable;

    public onCellChange(value: TableDataChangeEvent) {
        this.changeMsg = `field: '${value.field}', row: ${value.row}, column: ${value.column}, rawColumn: ${value.rawColumn}, cellData: ${value.cellData}, oldCellData: ${value.oldCellData}`;
        let rows = value.row instanceof Array ? value.row : [value.row];
        for (let row of rows) {
            console.log(this.tableData.data[row][value.rawColumn]);
        }

        this.selectedRows = "";
        // table的getRenderers会根据列索引返回对应列的所有渲染器
        // 根据第二列即checkbox列，返回所有的checkbox列信息，找到选中列
        this.myTable.getRenderers(1).forEach(renderer => {
            const checkboxState = renderer.renderer.checkboxState;
            if (checkboxState.checked == true) {
                this.selectedRows = this.selectedRows + checkboxState.row + " , ";
            }
        });

    }
}

/**
 * 带有可编辑标识的渲染器
 * */
@Component({
    template: '{{cellData}}<span class="fa fa-edit"></span>',
    styles: [`.fa {
        margin-left: 5px
    }`]
})
export class MyEditableCell extends TableCellRenderer {
}

/**
 * 薪资大于15000高亮显示的渲染器
 * */
@Component({
    template: `<span [class.highlight]="highlight">{{cellData}}</span>`,
    styles: [`.highlight {
        color: red
    }`]
})
export class MySalaryHeightLightCell extends TableCellRenderer implements OnInit {

    highlight: boolean;

    ngOnInit() {
        if (parseInt(this.cellData.replace('$', '')) > 15000) {
            this.highlight = true
        }
    }
}

/*
 * 操作列
 * */
@Component({
    template: `
        <a href="javascript:;" (click)="clickHandler('修改')">修改</a>
        <a href="javascript:;" (click)="clickHandler('删除')">删除</a>`,
    styles: [`
        a {
            color: #ffaa00
        }

        a:hover {
            text-decoration: underline
        }
    `]
})
export class MyOptionCell extends TableCellRenderer {
    clickHandler(action) {
        alert(`正在${action}第 ${this.row + 1} 行的数据！`)
    }
}

