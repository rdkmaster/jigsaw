import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/common/core/data/table-data";
import {AdditionalColumnDefine} from "jigsaw/pc-components/table/table-typings";
import {TableCellRendererBase} from "jigsaw/pc-components/table/table-renderer";

/*
 * 操作列头
 * */
@Component({
    template: '<span>操作</span>'
})
export class MyTableHeadOption extends TableCellRendererBase {
}

/*
 * 操作列
 * */
@Component({
    template: `
        <a href="javascript:;" (click)="clickHandler('修改')">修改</a>
        <a href="javascript:;" (click)="clickHandler('删除')">删除</a>`,
    styles: [`a {
        color: #ffaa00
    }

    a:hover {
        text-decoration: underline
    }`]
})
export class MyTableCellOption extends TableCellRendererBase {
    clickHandler(actioin) {
        alert(`正在${actioin}第 ${this.row + 1} 行的数据！`)
    }
}

@Component({
    templateUrl: './demo.component.html'
})
export class TableAddColumnDemoComponent {
    tableData: TableData;

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    additionalColumns: AdditionalColumnDefine[] = [{
        header: {
            renderer: MyTableHeadOption,
        },
        cell: {
            renderer: MyTableCellOption
        }
    }];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawTable.additionalColumnDefines',
        'AdditionalColumnDefine'
    ];
}



