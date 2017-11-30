import {AfterViewInit, Component, ViewChild, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-typings";
import {JigsawInput} from "jigsaw/component/input/input";
import {TableCellRendererBase} from "jigsaw/component/table/table-renderer";


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
                      (blur)="change(cellData)"></jigsaw-input>`
})
export class MyTableCellEditor extends TableCellRendererBase implements AfterViewInit {

    @ViewChild(JigsawInput) input: JigsawInput;

    ngAfterViewInit() {
        this.input.focus();
    }

}

@Component({
    templateUrl: './app.component.html',
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
                editorRenderer: MyTableCellEditor
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
}



